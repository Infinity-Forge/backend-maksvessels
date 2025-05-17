const db = require('../dataBase/connection'); 

module.exports = {
    async listarInfsJogo(request, response) {
        try {

            const sql = `
               SELECT
                    inf_id, cat_id, usu_id, inf_titulo, inf_descricao, inf_imagem 
                FROM INF_JOGO;
            `;

            const [rows] = await db.query(sql);

            const nRegistros = rows.length;

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de informações do jogo', 
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
    async cadastrarInfsJogo(request, response) {
        try {

            const { inf_id, cat_id, usu_id, inf_titulo, inf_descricao, inf_imagem } = request.body;
            
            // Instrução SQL
            const sql = `
                INSERT INTO INF_JOGO
                        (cat_id, usu_id, inf_titulo, inf_descricao, inf_imagem) 
                    VALUES
                        (?, ?, ?, ?, ?)
                    `;

                    const values = [inf_id, cat_id, usu_id, inf_titulo, inf_descricao, inf_imagem];

                    const [result] = await db.query(sql, values);

                    const dados = {
                        inf_id: result.insertId,
                        cat_id,
                        usu_id,
                        inf_titulo,
                        inf_descricao,
                        inf_imagem
                    };

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Cadastro de informações do jogo', 
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
    async editarInfsJogo(request, response) {
        try {
            const { cat_id, usu_id, inf_titulo, inf_descricao, inf_imagem } = request.body;

            const { id } = request.params;

            const sql = `
                UPDATE INF_JOGO SET
                    cat_id = ?, usu_id = ?, inf_titulo = ?, inf_descricao = ?, inf_imagem = ?
                WHERE
                    inf_id = ?;
            `;

            const values = [ cat_id, usu_id, inf_titulo, inf_descricao, inf_imagem, id ];

            const [result] = await db.query(sql, values);

            if(result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Informação ${id} não encontrada!`,
                    dados: null
                })
            }

            const dados = {
                id,
                cat_id,
                usu_id,
                inf_titulo,
                inf_descricao,
                inf_imagem
            };

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Informação ${id} atualizada com sucesso!`, 
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
    async apagarInfsJogo(request, response) {
        try {
            const { id } = request.params;

            const sql = `DELETE FROM INF_JOGO WHERE inf_id = ?`;

            const values = [id];

            const [result] = await db.query(sql, values);

            if(result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Informação ${inf_id} não encontrada!`,
                    dados: null
                });
            }

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Informação ${id} excluída com sucesso`, 
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