const db = require('../database/connection'); 

module.exports = {
    async listarInfsJogo(request, response) {
        try {
            const { titulo, categoria, autor, id, page = 1, limit = 10 } = request.query;
            const offset = (parseInt(page) - 1) * parseInt(limit);

            let where = "WHERE 1=1";
            const values = [];

            if (titulo) {
                where += " AND inf_titulo LIKE ?";
                values.push(`%${titulo}%`);
            }
            if (categoria) {
                where += " AND cat_id = ?";
                values.push(categoria);
            }
            if (autor) {
                where += " AND usu_id = ?";
                values.push(autor);
            }
            if (id) {
                where += " AND inf_id = ?";
                values.push(id);
            }

            const [[{ total }]] = await db.query(`SELECT COUNT(*) as total FROM INF_JOGO ${where}`, values);

            const sql = `
                SELECT inf_id, cat_id, usu_id, inf_titulo, inf_descricao, inf_imagem
                FROM INF_JOGO
                ${where}
                LIMIT ? OFFSET ?
            `;
            values.push(parseInt(limit), offset);

            const [rows] = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: rows.length > 0 ? 'Informações do jogo encontradas.' : 'Nenhuma informação encontrada.',
                nItens: rows.length,
                total,
                dados: rows
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao listar informações do jogo.',
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
