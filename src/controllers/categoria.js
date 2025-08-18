const db = require('../database/connection'); 

module.exports = {
    async listarCategoria(request, response) {
        try {
            const { id, nome } = request.query;

            const sql = `
                SELECT cat_id, cat_nome 
                FROM CATEGORIA
                WHERE cat_id LIKE ? AND cat_nome LIKE ?;
            `;

            const [rows] = await db.query(sql, [
                id ? id : `%`,
                nome ? `%${nome}%` : `%`
            ]);

            return response.status(200).json({
                sucesso: true,
                mensagem: rows.length > 0 ? 'Categorias encontradas.' : 'Nenhuma categoria encontrada.',
                nItens: rows.length,
                dados: rows
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao listar categorias.',
                dados: error.message
            });
        }
    }, 
    async cadastrarCategoria(request, response) {
        try {
            const { cat_nome } = request.body;
            const sql = `
            INSERT INTO CATEGORIA 
              (cat_nome) 
            VALUES
              (?);
            `;

            const values = [cat_nome];
            const [result] = await db.query(sql, values);

            const dados = {
                cat_id: result.insertId,
                cat_nome
            };
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Cadastro de categoria', 
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
    async editarCategoria(request, response) {
        try {
            const { cat_nome } = request.body;
            const { id } = request.params;
            const sql = `
            UPDATE CATEGORIA SET
               cat_nome = ? 
            WHERE
               cat_id = ?; 
            `;
            
            const values = [ cat_nome, id ]; 
            const [result] = await db.query(sql, values); 
            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false, 
                    mensagem: `Categoria ${id} não encontrada.`, 
                    dados: null
                });
            }

            const dados = {
                id,
                cat_nome
            };

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Alteração na categoria', 
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
    async apagarCategoria(request, response) {
        try {
            const { id } = request.params;
            const sql = `DELETE FROM categoria WHERE cat_id = ?;`;
            const values = [id];
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Categoria ${id} não encontrada.`,
                    dados: null
                });
            }

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Categoria ${id} excluída com sucesso!`,	 
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
