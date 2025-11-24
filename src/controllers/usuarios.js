const db = require('../database/connection');
const { criptografarSenha, verificarSenha } = require('../utils/criptografia');
const { validarEmail, validarTipoUsuario } = require('../utils/validacoes');

module.exports = {
    async listarUsuarios(request, response) {
        try {
            const { nome, email, tipo, ativo, data_inicio, data_fim, page = 1, limit = 10 } = request.query;
            const offset = (parseInt(page) - 1) * parseInt(limit);

            let where = "WHERE 1=1";
            const values = [];

            if (nome) {
                where += " AND usu_nome LIKE ?";
                values.push(`%${nome}%`);
            }
            if (email) {
                where += " AND usu_email LIKE ?";
                values.push(`%${email}%`);
            }
            if (tipo) {
                where += " AND usu_tipo = ?";
                values.push(tipo);
            }
            if (ativo) {
                where += " AND usu_ativo = ?";
                values.push(ativo);
            }
            if (data_inicio && data_fim) {
                where += " AND usu_data_cadastro BETWEEN ? AND ?";
                values.push(data_inicio, data_fim);
            }

            const [[{ total }]] = await db.query(`SELECT COUNT(*) as total FROM USUARIOS ${where}`, values);

            const sql = `
                SELECT usu_id, usu_nome, usu_email, usu_tipo, usu_data_cadastro, usu_ativo
                FROM USUARIOS
                ${where}
                LIMIT ? OFFSET ?
            `;
            values.push(parseInt(limit), offset);

            const [rows] = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: rows.length > 0 ? 'Lista de usuários encontrada.' : 'Nenhum usuário encontrado.',
                nItens: rows.length,
                total,
                dados: rows
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao listar usuários.',
                dados: error.message
            });
        }
    },

    async cadastrarUsuarios(request, response) {
        try {
            const { usu_nome, usu_email, usu_senha, usu_tipo } = request.body;

            // Validações
            if (!usu_nome || !usu_email || !usu_senha || !usu_tipo) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Campos obrigatórios: nome, email, senha e tipo.'
                });
            }

            if (!validarEmail(usu_email)) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Email inválido.'
                });
            }

            if (!validarTipoUsuario(usu_tipo)) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Tipo de usuário inválido. Use: admin, usuario ou moderador.'
                });
            }

            // Verificar se email já existe
            const [emailExistente] = await db.query(
                'SELECT usu_id FROM USUARIOS WHERE usu_email = ?',
                [usu_email]
            );

            if (emailExistente.length > 0) {
                return response.status(409).json({
                    sucesso: false,
                    mensagem: 'Email já cadastrado.'
                });
            }

            // Criptografar senha
            const senhaCriptografada = await criptografarSenha(usu_senha);

            const sql = `
                INSERT INTO USUARIOS 
                    (usu_nome, usu_email, usu_senha, usu_tipo) 
                VALUES (?, ?, ?, ?);
            `;

            const values = [usu_nome, usu_email, senhaCriptografada, usu_tipo];
            const [result] = await db.query(sql, values);

            return response.status(201).json({
                sucesso: true,
                mensagem: 'Usuário cadastrado com sucesso.',
                dados: { 
                    usu_id: result.insertId, 
                    usu_nome, 
                    usu_email, 
                    usu_tipo 
                }
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao cadastrar usuário.',
                dados: error.message
            });
        }
    },

    async login(request, response) {
        try {
            const { email, senha } = request.query;

            if (!email || !senha) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Email e senha são obrigatórios.'
                });
            }

            const sql = `
                SELECT usu_id, usu_nome, usu_tipo, usu_senha 
                FROM USUARIOS 
                WHERE usu_email = ? AND usu_ativo = 1;
            `;

            const [rows] = await db.query(sql, [email]);

            if (rows.length === 0) {
                return response.status(401).json({
                    sucesso: false,
                    mensagem: 'Email não encontrado ou usuário inativo.'
                });
            }

            const usuario = rows[0];
            const senhaValida = await verificarSenha(senha, usuario.usu_senha);

            if (!senhaValida) {
                return response.status(401).json({
                    sucesso: false,
                    mensagem: 'Senha incorreta.'
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Login efetuado com sucesso.',
                dados: {
                    id: usuario.usu_id,
                    nome: usuario.usu_nome,
                    tipo: usuario.usu_tipo,
                    token: usuario.usu_id // Simples - usar JWT em produção
                }
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro no login.',
                dados: error.message
            });
        }
    },

    async editarUsuarios(request, response) {
        try {
            const { usu_nome, usu_email, usu_tipo, usu_ativo } = request.body;
            const { id } = request.params;

            // Validações
            if (usu_email && !validarEmail(usu_email)) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Email inválido.'
                });
            }

            if (usu_tipo && !validarTipoUsuario(usu_tipo)) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Tipo de usuário inválido.'
                });
            }

            // Verificar se email já existe (excluindo o próprio usuário)
            if (usu_email) {
                const [emailExistente] = await db.query(
                    'SELECT usu_id FROM USUARIOS WHERE usu_email = ? AND usu_id != ?',
                    [usu_email, id]
                );

                if (emailExistente.length > 0) {
                    return response.status(409).json({
                        sucesso: false,
                        mensagem: 'Email já está em uso por outro usuário.'
                    });
                }
            }

            const sql = `
                UPDATE USUARIOS SET
                    usu_nome = COALESCE(?, usu_nome),
                    usu_email = COALESCE(?, usu_email),
                    usu_tipo = COALESCE(?, usu_tipo),
                    usu_ativo = COALESCE(?, usu_ativo)
                WHERE usu_id = ?;
            `;
            
            const values = [usu_nome, usu_email, usu_tipo, usu_ativo, id];
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Usuário ${id} não encontrado.`
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: `Usuário ${id} atualizado com sucesso!`
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao atualizar usuário.',
                dados: error.message
            });
        }
    },

    async atualizaSenha(request, response) {
        try {
            const { senha_atual, nova_senha } = request.body;
            const { id } = request.params;

            if (!senha_atual || !nova_senha) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Senha atual e nova senha são obrigatórias.'
                });
            }

            // Buscar usuário
            const [usuarios] = await db.query(
                'SELECT usu_senha FROM USUARIOS WHERE usu_id = ?',
                [id]
            );

            if (usuarios.length === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: 'Usuário não encontrado.'
                });
            }

            // Verificar senha atual
            const senhaValida = await verificarSenha(senha_atual, usuarios[0].usu_senha);
            if (!senhaValida) {
                return response.status(401).json({
                    sucesso: false,
                    mensagem: 'Senha atual incorreta.'
                });
            }

            // Criptografar nova senha
            const novaSenhaCriptografada = await criptografarSenha(nova_senha);

            const sql = `UPDATE USUARIOS SET usu_senha = ? WHERE usu_id = ?`;
            await db.query(sql, [novaSenhaCriptografada, id]);

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Senha atualizada com sucesso!'
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao atualizar senha.',
                dados: error.message
            });
        }
    },

    async ocultarUsuario(request, response) {
        try {
            const { id } = request.params;

            const sql = `UPDATE USUARIOS SET usu_ativo = 0 WHERE usu_id = ?`;
            const [result] = await db.query(sql, [id]);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Usuário ${id} não encontrado!`
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: `Usuário ${id} desativado com sucesso`
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao desativar usuário.',
                dados: error.message
            });
        }
    },

    async apagarUsuarios(request, response) {
        try {
            const { id } = request.params;

            const sql = `DELETE FROM USUARIOS WHERE usu_id = ?`;
            const [result] = await db.query(sql, [id]);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Usuário ${id} não encontrado.`
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: `Usuário ${id} excluído com sucesso!`
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao excluir usuário.',
                dados: error.message
            });
        }
    }
};