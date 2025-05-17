const db = require('../database/connection'); 

module.exports = {
    async listarFAQ(request, response) {
        try {

            const sql = `
                SELECT faq_id, usu_id, faq_pergunta, faq_resposta FROM FAQ;
            `;

            const [rows] = await db.query(sql);

            const nRegistros = rows.length;
            if (nRegistros === 0) {
                return response.status(404).json({
                    sucesso: false, 
                    mensagem: 'Nenhum registro encontrado.', 
                    dados: null
                });
            }

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de perguntas do FAQ',
                nRegistros, 
                dados: rows
            });
            
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.', 
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
