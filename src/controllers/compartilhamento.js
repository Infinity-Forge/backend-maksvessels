const db = require('../dataBase/connection'); 

module.exports = {
    async listarCompartilhamento(request, response) {
        try {
           
            const sql = `
            SELECT comp_id, not_id, comp_plataforma, comp_data FROM COMPARTILHAMENTO;
            
            `;
           
            const [rows] = await db.query(sql);

            const nRegistros = rows.length;


            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de Compartilhamento', 
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
    async cadastrarCompartilhamento(request, response) {
        try {


            const { not_id, comp_plataforma, comp_data } = request.body;


            const sql = `

            INSERT INTO COMPARTILHAMENTO (not_id, comp_plataforma, comp_data)
            VALUES (?, ?, ?);
            `;

            const values = [not_id, comp_plataforma, comp_data];
            
            const [result] = await db.query(sql, values);

            const dados = {
                comp_id: result.insertId,
                not_id,
                comp_plataforma,
                comp_data
            };

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Criação de Compartilhamento', 
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
    async editarCompartilhamento(request, response) {
        try {
             
            const { not_id, comp_plataforma, comp_data } = request.body;
            const { comp_id } = request.params;

            const sql = `
            UPDATE COMPARTILHAMENTO
            SET not_id = ?, comp_plataforma = ?, comp_data = ?
            WHERE comp_id = ?;
            `;

            const values = [not_id, comp_plataforma, comp_data, comp_id];
            const [result] = await db.query(sql, values);



            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false, 
                    mensagem: 'Compartilhamento não encontrado.', 
                    dados: null
                });
            }

            const dados = {
                comp_id,
                not_id,
                comp_plataforma,
                comp_data
            };

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Edição de Compartilhamento',
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
    async apagarCompartilhamento(request, response) {
        try {

            const { comp_id } = request.params;
            const sql = `
            DELETE FROM COMPARTILHAMENTO
            WHERE comp_id = ?;
            `;
            const values = [comp_id];
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false, 
                    mensagem: 'Compartilhamento não encontrado.', 
                    dados: null
                });
            }


            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Compartilhamento apagado com sucesso.', 
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