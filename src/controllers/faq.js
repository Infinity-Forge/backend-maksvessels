const db = require('../database/connection');

module.exports = {
    async listarFAQ(request, response) {
        try {
            const { query, page = 1, limit = 10 } = request.query;
            const offset = (parseInt(page) - 1) * parseInt(limit);

            let where = "WHERE 1=1";
            const values = [];

            if (query) {
                where += " AND (faq_pergunta LIKE ? OR faq_resposta LIKE ?)";
                values.push(`%${query}%`, `%${query}%`);
            }

            const [[{ total }]] = await db.query(`SELECT COUNT(*) as total FROM FAQ ${where}`, values);

            const sql = `
                SELECT faq_id, usu_id, faq_pergunta, faq_resposta
                FROM FAQ
                ${where}
                ORDER BY faq_id
                LIMIT ? OFFSET ?
            `;
            values.push(parseInt(limit), offset);

            const [rows] = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: rows.length > 0 ? 'FAQ encontrado.' : 'Nenhuma FAQ encontrada.',
                nItens: rows.length,
                total,
                dados: rows
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao listar FAQ.',
                dados: error.message
            });
        }
    },

    async adicionarFAQ(request, response) {
        try {
            const { usu_id, faq_pergunta, faq_resposta } = request.body;

            // Validações
            if (!usu_id || !faq_pergunta) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Campos obrigatórios: usu_id e pergunta.'
                });
            }

            // Verificar usuário
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

            const sql = `
                INSERT INTO FAQ
                    (usu_id, faq_pergunta, faq_resposta)
                VALUES (?, ?, ?);
            `;

            const values = [usu_id, faq_pergunta, faq_resposta];
            const [result] = await db.query(sql, values);

            return response.status(201).json({
                sucesso: true, 
                mensagem: 'Pergunta adicionada no FAQ com sucesso.', 
                dados: {
                    faq_id: result.insertId,
                    usu_id,
                    faq_pergunta,
                    faq_resposta
                }
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro ao adicionar pergunta no FAQ.', 
                dados: error.message
            });
        }
    },

    async editarFAQ(request, response) {
        try {
            const { faq_pergunta, faq_resposta } = request.body;
            const { id } = request.params;

            const sql = `
                UPDATE FAQ SET
                    faq_pergunta = COALESCE(?, faq_pergunta),
                    faq_resposta = COALESCE(?, faq_resposta)
                WHERE faq_id = ?;
            `;

            const values = [faq_pergunta, faq_resposta, id];
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false, 
                    mensagem: 'Registro não encontrado.'
                });
            }

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Pergunta ${id} do FAQ atualizada com sucesso!`
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro ao editar pergunta do FAQ.', 
                dados: error.message
            });
        }
    },

    async removerFAQ(request, response) {
        try {
            const { id } = request.params;

            const sql = `DELETE FROM FAQ WHERE faq_id = ?`;
            const [result] = await db.query(sql, [id]);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false, 
                    mensagem: 'Registro não encontrado.'
                });
            }

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Pergunta ${id} do FAQ excluída com sucesso!`
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro ao excluir pergunta do FAQ.', 
                dados: error.message
            });
        }
    }
};