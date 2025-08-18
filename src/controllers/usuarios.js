const db = require('../database/connection'); 

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
            const { usu_nome, usu_email, usu_senha, usu_data_cadastro, usu_tipo } = request.body;
            const sql = `
            INSERT INTO USUARIOS 
              (usu_nome, usu_email, usu_senha, usu_data_cadastro, usu_tipo) 
            VALUES
              (?, ?, ?, ?, ?);
            `;

            const values = [usu_nome, usu_email, usu_senha, usu_data_cadastro, usu_tipo];
            const [result] = await db.query(sql, values);

            const dados = {
                usu_id: result.insertId,
                usu_nome,
                usu_email,
                usu_tipo 
            }; 
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Cadastro de usuários', 
                dados: dados
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.', 
                dados: error.message
            });
        }
    }, 
    async editarUsuarios(request, response) {
        try {
            const { usu_nome, usu_email, usu_senha, usu_data_cadastro, usu_tipo } = request.body;
            const { id } = request.params;
            const sql = `
            UPDATE USUARIOS SET
                usu_nome = ?, usu_email = ?, usu_senha = ?, usu_data_cadastro = ?, usu_tipo = ?
            WHERE
                usu_id = ?;
            `;
            
            const values = [usu_nome, usu_email, usu_senha, usu_data_cadastro, usu_tipo, id];
            const [result] = await db.query(sql, values);
            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false, 
                    mensagem: `Usuário ${id} não encontrado.`, 
                    dados: null
                });
            }

            const dados = {
                id,
                usu_nome,
                usu_email,
                usu_tipo 
            };

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Usuário ${id} atualizado com sucesso!`, 
                dados: dados
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.', 
                dados: error.message
            });
        }
    }, 
    async apagarUsuarios(request, response) {
        try {
            const { id } = request.params;
            const sql = `DELETE FROM usuarios WHERE usu_id = ?;`;
            const values = [id];
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Usuário ${id} não encontrada.`,
                    dados: null
                });
            }
            return response.status(200).json({
                sucesso: true, 
                mensagem: `Usuário ${id} excluído com sucesso!`, 
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.', 
                dados: error.message
            });
        }
    }, 
    async editarUsuariosAvancado(request, response) {
        try {
            const { id } = request.params;
            const updates = {};
            const values = [];

            // Verifica cada campo e o adiciona ao objeto 'updates' se existir no body
            if (request.body.nome) {
                updates.usu_nome = '?';
                values.push(request.body.nome);
            }
            if (request.body.email) {
                updates.usu_email = '?';
                values.push(request.body.email);
            }
            if (request.body.dt_nasc) {
                updates.usu_dt_nasc = '?';
                values.push(request.body.dt_nasc);
            }
            if (request.body.senha) {
                updates.usu_senha = '?';
                values.push(request.body.senha);
            }
            if (request.body.tipo) {
                updates.usu_tipo = '?';
                values.push(request.body.tipo);
            }
            if (request.body.ativo !== undefined) { // Importante verificar se 'ativo' existe
                updates.usu_ativo = '?';
                values.push(request.body.ativo);
            }

            // Se não houver campos para atualizar, retorna um erro
            if (Object.keys(updates).length === 0) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Nenhum campo para atualizar foi fornecido.',
                    dados: null
                });
            }

            // Constrói a parte SET da query dinamicamente
            const setClauses = Object.keys(updates)
                .map(key => `${key} = ${updates[key]}`)
                .join(', ');

            const sql = `
                UPDATE USUARIOS SET
                    ${setClauses}
                WHERE
                    usu_id = ?;
            `;

            values.push(id); // Adiciona o ID aos valores

            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Usuário ${id} não encontrado!`,
                    dados: null
                });
            }

            // Retorna os dados atualizados (apenas os que foram enviados)
            const dadosAtualizados = { id, ...request.body };

            return response.status(200).json({
                sucesso: true,
                mensagem: `Usuário ${id} atualizado com sucesso!`,
                dados: dadosAtualizados
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },
    async ocultarUsuario(request, response) {
        try {

            const ativo = false;
            const { id } = request.params;
            const sql = `
                UPDATE USUARIOS SET 
                    usu_ativo = ? 
                WHERE 
                    usu_id = ?;
            `;

            const values = [ativo, id];
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Usuário ${id} não encontrado!`,
                    dados: null
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: `Usuário ${id} excluído com sucesso`,
                dados: null
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },
    async login(request, response) {
        try {

            const { email, senha } = request.query;
            
            const sql = `
                SELECT 
                    usu_id, usu_nome, usu_tipo 
                FROM 
                    USUARIOS
                WHERE 
                    usu_email = ? AND usu_senha = ? AND usu_ativo = 1;
            `;

            const values = [email, senha];

            const [rows] = await db.query(sql, values);
            const nItens = rows.length;

            if (nItens < 1) {
                return response.status(403).json({
                    sucesso: false,
                    mensagem: 'Login e/ou senha inválido.',
                    dados: null,
                });
            }

            const dados = rows.map(usuario => ({
                id: usuario.usu_id, 
                nome: usuario.usu_nome, 
                tipo: usuario.usu_tipo
            }));

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Login efetuado com sucesso',
                dados
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },
    async atualizaSenha(request, response) {
        try {
            // parâmetros recebidos pelo corpo da requisição
            const { usu_senha } = request.body;
            // parâmetro recebido pela URL via params ex: /usuario/1
            const { usu_id } = request.params;
            // instruções SQL
            const sql = `
                UPDATE USUARIOS
                SET usu_senha = ? 
                WHERE usu_id = ?;
            `;
            // preparo do array com dados que serão atualizados
            const values = [usu_senha, usu_id];
            // execução e obtenção de confirmação da atualização realizada
            const [result] = await db.query(sql, values); 

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Usuário ${id} não encontrado!`,
                    dados: null
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: `Usuário ${usu_id} atualizado com sucesso!`,
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },
};  
