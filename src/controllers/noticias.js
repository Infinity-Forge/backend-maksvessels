const db = require('../dataBase/connection'); 

module.exports = {
    async listarNoticias(request, response) {
        try {

            const sql = `
                SELECT
                    not_id, usu_id, not_titulo, not_conteudo, not_imagem, not_data_publicacao 
                FROM NOTICIAS;
            `;

            const [rows] = await db.query(sql);

            const nRegistros = rows.length;


            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de noticias',
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

