const db = require('../database/connection');

module.exports = {
    async listarAssuntos(request, response) {
        try {

            const sql = `
            SELECT
                asst_id, asst_nome 
            FROM ASSUNTOS;
            `;

            const [rows] = await db.query(sql);

            const nRegistros = rows.length;


            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de Assuntos',
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
    async cadastrarAssuntos(request, response) {

        try {
            const { asst_nome } = request.body;


            const sql = `
            INSERT INTO ASSUNTOS 
            (asst_nome) 
            VALUES
            (?)
    `;

            const values = [asst_nome];

            const [result] = await db.query(sql, values);

            const dados = {
                id: result.insertID,
                asst_nome
            };


            return response.status(200).json({
                sucesso: true,
                mensagem: 'Cadastro de Assuntos',
                dados: dados
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisiçao.',
                dados: error.message

            });
        }
    }, 
    async editarAssuntos(request, response) {
    try {
        const { asst_nome } = request.body;

            const { id } = request.params;

            const sql = `
                UPDATE ASSUNTOS SET
                    asst_nome = ?
                WHERE
                    asst_id = ?;
            `;

            const values = [ asst_nome, id ];

            const [result] = await db.query(sql, values);

            if(result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Usuário ${id} não encontrado!`,
                    dados: null
                })
            }

            const dados = {
                id,
                asst_nome
            };

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Usuário ${id} atualizado com sucesso!`, 
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
    async apagarAssuntos(request, response) {
    try {
            const { id } = request.params;

            const sql = `DELETE FROM ASSUNTOS WHERE asst_id = ?`;

            const values = [id];

            const [result] = await db.query(sql, values);

            if(result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Assunto ${asst_id} não encontrado!`,
                    dados: null
                })
            }

        return response.status(200).json({
            sucesso: true,
            mensagem: `Assunto ${id} excluído com sucesso`,
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