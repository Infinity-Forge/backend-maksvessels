const db = require('../database/connection');

module.exports = {
    async listarAssunto(request, response) {
        try {
            const { nome, page = 1, limit = 10 } = request.query;
            const offset = (parseInt(page) - 1) * parseInt(limit);

            let where = "WHERE 1=1";
            const values = [];

            if (nome) {
                where += " AND asst_nome LIKE ?";
                values.push(`%${nome}%`);
            }

            const [[{ total }]] = await db.query(`SELECT COUNT(*) as total FROM ASSUNTOS ${where}`, values);

            const sql = `
                SELECT asst_id, asst_nome
                FROM ASSUNTOS
                ${where}
                ORDER BY asst_nome
                LIMIT ? OFFSET ?
            `;
            values.push(parseInt(limit), offset);

            const [rows] = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: rows.length > 0 ? 'Assuntos encontrados.' : 'Nenhum assunto encontrado.',
                nItens: rows.length,
                total,
                dados: rows
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao listar assuntos.',
                dados: error.message
            });
        }
    },

    async cadastrarAssunto(request, response) {
        try {
            const { asst_nome } = request.body;

            if (!asst_nome) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Campo obrigatório: nome.'
                });
            }

            // Verificar se assunto já existe
            const [assuntoExistente] = await db.query(
                'SELECT asst_id FROM ASSUNTOS WHERE asst_nome = ?',
                [asst_nome]
            );

            if (assuntoExistente.length > 0) {
                return response.status(409).json({
                    sucesso: false,
                    mensagem: 'Assunto já existe.'
                });
            }

            const sql = `INSERT INTO ASSUNTOS (asst_nome) VALUES (?)`;
            const [result] = await db.query(sql, [asst_nome]);

            return response.status(201).json({
                sucesso: true,
                mensagem: 'Assunto cadastrado com sucesso.',
                dados: {
                    asst_id: result.insertId,
                    asst_nome
                }
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao cadastrar assunto.',
                dados: error.message
            });
        }
    },

    async editarAssunto(request, response) {
        try {
            const { asst_nome } = request.body;
            const { id } = request.params;

            if (!asst_nome) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Campo obrigatório: nome.'
                });
            }

            // Verificar se assunto já existe (excluindo o atual)
            const [assuntoExistente] = await db.query(
                'SELECT asst_id FROM ASSUNTOS WHERE asst_nome = ? AND asst_id != ?',
                [asst_nome, id]
            );

            if (assuntoExistente.length > 0) {
                return response.status(409).json({
                    sucesso: false,
                    mensagem: 'Assunto já existe.'
                });
            }

            const sql = `UPDATE ASSUNTOS SET asst_nome = ? WHERE asst_id = ?`;
            const [result] = await db.query(sql, [asst_nome, id]);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Assunto ${id} não encontrado.`
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: `Assunto ${id} atualizado com sucesso!`
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao editar assunto.',
                dados: error.message
            });
        }
    },

    async apagarAssunto(request, response) {
        try {
            const { id } = request.params;

            const sql = `DELETE FROM ASSUNTOS WHERE asst_id = ?`;
            const [result] = await db.query(sql, [id]);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Assunto ${id} não encontrado.`
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: `Assunto ${id} excluído com sucesso!`
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao excluir assunto.',
                dados: error.message
            });
        }
    }
};;  