const db = require('../database/connection'); 

module.exports = {
    async listarNoticias(request, response) {
        try {
            const { titulo, autor, data_inicio, data_fim, page = 1, limit = 10 } = request.query;
            const offset = (parseInt(page) - 1) * parseInt(limit);

            let where = "WHERE 1=1";
            const values = [];

            if (titulo) {
                where += " AND not_titulo LIKE ?";
                values.push(`%${titulo}%`);
            }
            if (autor) {
                where += " AND usu_id = ?";
                values.push(autor);
            }
            if (data_inicio && data_fim) {
                where += " AND not_data_publicacao BETWEEN ? AND ?";
                values.push(data_inicio, data_fim);
            }

            const [[{ total }]] = await db.query(`SELECT COUNT(*) as total FROM NOTICIAS ${where}`, values);

            const sql = `
                SELECT not_id, usu_id, not_titulo, not_conteudo, not_imagem, not_data_publicacao
                FROM NOTICIAS
                ${where}
                ORDER BY not_data_publicacao DESC
                LIMIT ? OFFSET ?
            `;
            values.push(parseInt(limit), offset);

            const [rows] = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: rows.length > 0 ? 'Notícias encontradas.' : 'Nenhuma notícia encontrada.',
                nItens: rows.length,
                total,
                dados: rows
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao listar notícias.',
                dados: error.message
            });
        }
    }, 
    async cadastrarNoticias(request, response) {
        try {

            const { usu_id, not_titulo, not_conteudo, not_imagem } = request.body;

            //instruçao SQL
            const sql = `
                INSERT INTO NOTICIAS
                 (usu_id, not_titulo, not_conteudo, not_imagem) 
                 VALUES

              (?, ?, ?, ?)
            `;
            
            //definição dos dados a serem inseridos em um array
            const values = [ usu_id, not_titulo, not_conteudo, not_imagem ];

            //execução da instrução sql passando os parâmetros
            const [result] = await db.query(sql, values);

            //identificação do ID de registro inserido
            const dados = {

                id: result.insertId,
                usu_id, 
                not_titulo, 
                not_conteudo,
                not_imagem

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

    async editarNoticias(request, response) {
        try {

            //parametros recebidos pelo corpo da requisição
            const { usu_id, not_titulo, not_conteudo, not_imagem } = request.body;

            //parametros recebido pela URL via params ex: /usuario/1
            const { id } = request.params;

            const sql = `
                UPDATE NOTICIAS SET
                    usu_id =?, not_titulo =?, not_conteudo =?, not_imagem =?
                WHERE
                    not_id =?;
            `;

            //preparo do array com dados que serao atualizados
            const values = [usu_id, not_titulo, not_conteudo, not_imagem, id];

            //execuçao e obtençao de confirmaçao da atualizaçao realizada
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0){

                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Usuario ${id} não encontrado`,
                    dados: null
                });
            }
            
            const dados = {
                usu_id, 
                not_titulo, 
                not_conteudo, 
                not_imagem
            };

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Alteração no cadastro de noticia', 
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


    async apagarNoticias(request, response) {
        try {
            const { id } = request.params;

            const sql = `DELETE FROM NOTICIAS WHERE not_id = ?`;

            const values = [id];

            const [result] = await db.query(sql, values);

            if(result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Notícia ${not_id} não encontrada!`,
                    dados: null
                })
            };

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Notícia ${id} excluída com sucesso`, 
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

