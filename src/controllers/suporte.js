const db = require('../database/connection');
const { validarEmail, validarStatusSuporte } = require('../utils/validacoes');

module.exports = {
    async listarSuporte(request, response) {
        try {
            const { status, assunto, usuario, data_inicio, data_fim, page = 1, limit = 10 } = request.query;
            const offset = (parseInt(page) - 1) * parseInt(limit);

            let where = "WHERE 1=1";
            const values = [];

            if (status) {
                where += " AND sup_status = ?";
                values.push(status);
            }
            if (assunto) {
                where += " AND asst_id = ?";
                values.push(assunto);
            }
            if (usuario) {
                where += " AND usu_id = ?";
                values.push(usuario);
            }
            if (data_inicio && data_fim) {
                where += " AND sup_data_criacao BETWEEN ? AND ?";
                values.push(data_inicio, data_fim);
            }

            const [[{ total }]] = await db.query(`SELECT COUNT(*) as total FROM SUPORTE ${where}`, values);

            const sql = `
                SELECT sup_id, usu_id, asst_id, sup_mensagem, sup_status, sup_data_criacao, sup_email, sup_nome
                FROM SUPORTE
                ${where}
                ORDER BY sup_data_criacao DESC
                LIMIT ? OFFSET ?
            `;
            values.push(parseInt(limit), offset);

            const [rows] = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: rows.length > 0 ? 'Mensagens de suporte encontradas.' : 'Nenhuma mensagem encontrada.',
                nItens: rows.length,
                total,
                dados: rows
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao listar suporte.',
                dados: error.message
            });
        }
    },

    async cadastrarSuporte(request, response) {
        try {
            const { usu_id, asst_id, sup_mensagem, sup_status, sup_email, sup_nome } = request.body;

            // Validações
            if (!asst_id || !sup_mensagem || !sup_email || !sup_nome) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Campos obrigatórios: assunto_id, mensagem, email e nome.'
                });
            }

            if (!validarEmail(sup_email)) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Email de contato inválido.'
                });
            }

            if (sup_status && !validarStatusSuporte(sup_status)) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Status inválido. Use: Aberto, Em andamento, Resolvido ou Fechado.'
                });
            }

            // Verificar se assunto existe
            const [assunto] = await db.query(
                'SELECT asst_id FROM ASSUNTOS WHERE asst_id = ?',
                [asst_id]
            );

            if (assunto.length === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: 'Assunto não encontrado.'
                });
            }

            // Se usu_id foi fornecido, verificar se existe
            if (usu_id) {
                const [usuario] = await db.query(
                    'SELECT usu_id FROM USUARIOS WHERE usu_id = ? AND usu_ativo = 1',
                    [usu_id]
                );

                if (usuario.length === 0) {
                    return response.status(404).json({
                        sucesso: false,
                        mensagem: 'Usuário não encontrado ou inativo.'
                    });
                }
            }

            const sql = `
                INSERT INTO SUPORTE
                    (usu_id, asst_id, sup_mensagem, sup_status, sup_email, sup_nome)
                VALUES (?, ?, ?, ?, ?, ?);
            `;

            const statusPadrao = sup_status || 'Aberto';
            const values = [usu_id, asst_id, sup_mensagem, statusPadrao, sup_email, sup_nome];
            const [result] = await db.query(sql, values);

            return response.status(201).json({
                sucesso: true, 
                mensagem: 'Ticket de suporte criado com sucesso.', 
                dados: {
                    sup_id: result.insertId,
                    usu_id,
                    asst_id, 
                    sup_mensagem, 
                    sup_status: statusPadrao,
                    sup_email,
                    sup_nome
                }
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro ao criar ticket de suporte.', 
                dados: error.message
            });
        }
    },

    async editarSuporte(request, response) {
        try {
            const { asst_id, sup_mensagem, sup_status, sup_email, sup_nome } = request.body;
            const { id } = request.params;
            
            // Validações
            if (sup_status && !validarStatusSuporte(sup_status)) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Status inválido.'
                });
            }

            if (sup_email && !validarEmail(sup_email)) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Email inválido.'
                });
            }

            const sql = `   
                UPDATE SUPORTE SET
                    asst_id = COALESCE(?, asst_id),
                    sup_mensagem = COALESCE(?, sup_mensagem),
                    sup_status = COALESCE(?, sup_status),
                    sup_email = COALESCE(?, sup_email),
                    sup_nome = COALESCE(?, sup_nome)
                WHERE sup_id = ?;
            `;
            
            const values = [asst_id, sup_mensagem, sup_status, sup_email, sup_nome, id];
            const [result] = await db.query(sql, values);
            
            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Ticket de suporte ${id} não encontrado!`
                });
            }

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Ticket de suporte ${id} atualizado com sucesso!`
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro ao atualizar ticket de suporte.', 
                dados: error.message
            });
        }
    },

    async apagarSuporte(request, response) {
        try {
            const { id } = request.params;
            
            const sql = `DELETE FROM SUPORTE WHERE sup_id = ?`;
            const [result] = await db.query(sql, [id]);
            
            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Ticket de suporte ${id} não encontrado!`
                });
            }

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Ticket de suporte ${id} excluído com sucesso!`
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro ao excluir ticket de suporte.', 
                dados: error.message
            });
        }
    }
};