const db = require('../database/connection'); 

module.exports = {
    async listarFAQ(request, response) {
        try {
            const { query } = request.query;

            const sql = `
                SELECT faq_id, usu_id, faq_pergunta, faq_resposta
                FROM FAQ
                WHERE faq_pergunta LIKE ? OR faq_resposta LIKE ?;
            `;

            const [rows] = await db.query(sql, [
                query ? `%${query}%` : `%`,
                query ? `%${query}%` : `%`
            ]);

            return response.status(200).json({
                sucesso: true,
                mensagem: rows.length > 0 ? 'FAQ encontrado.' : 'Nenhuma FAQ encontrada.',
                nItens: rows.length,
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

            const sql = `
                INSERT INTO FAQ
                    (usu_id, faq_pergunta, faq_resposta)
                VALUES
                    (?, ?, ?);
            `;

            const values = [usu_id, faq_pergunta, faq_resposta];

            const [result] = await db.query(sql, values);

            const dados = {
                faq_id: result.insertId,
                usu_id,
                faq_pergunta,
                faq_resposta
            };

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Adicionar pergunta no FAQ', 
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
    async editarFAQ(request, response) {
        try {
            const { usu_id, faq_pergunta, faq_resposta } = request.body;

            const { id } = request.params;

            const sql = `
                UPDATE FAQ SET
                    usu_id = ?, faq_pergunta = ?, faq_resposta = ?
                WHERE
                    faq_id = ?;
            `;

            const values = [usu_id, faq_pergunta, faq_resposta, id];
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false, 
                    mensagem: 'Registro não encontrado.', 
                    dados: null
                });
            }

            const dados = {
                faq_id: id,
                usu_id,
                faq_pergunta,
                faq_resposta
            }

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Alteração na pergunta ${id} do FAQ`, 
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
    async removerFAQ(request, response) {
        try {
            const { id } = request.params;

            const sql = `
                DELETE FROM FAQ
                WHERE faq_id = ?;
            `;
            const values = [id];
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false, 
                    mensagem: 'Registro não encontrado.', 
                    dados: null
                });
            }

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Exclusão da pergunta ${id} do FAQ`, 
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
