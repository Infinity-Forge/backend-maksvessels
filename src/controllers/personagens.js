const db = require('../database/connection');

module.exports = {
    async listarPersonagens(request, response) {
        try {
            const { nome, tipo } = request.query;

            let where = "WHERE 1=1";
            const values = [];

            if (nome) {
                where += " AND pers_nome LIKE ?";
                values.push(`%${nome}%`);
            }
            if (tipo !== undefined) {
                where += " AND pers_tipo = ?";
                values.push(tipo);
            }

            const [[{ total }]] = await db.query(`SELECT COUNT(*) as total FROM PERSONAGENS ${where}`, values);

            const sql = `
                SELECT pers_id, usu_id, pers_tipo, pers_nome, pers_src, pers_alt, pers_descricao, pers_frase, pers_data_criacao
                FROM PERSONAGENS
                ${where}
                ORDER BY pers_nome
            `;

            const [rows] = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: rows.length > 0 ? 'Personagens encontrados.' : 'Nenhum personagem encontrado.',
                nItens: rows.length,
                total,
                dados: rows
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao listar personagens.',
                dados: error.message
            });
        }
    },

    async listarPersonagemPorId(request, response) {
        try {
            const { id } = request.params;

            const sql = `
                SELECT pers_id, usu_id, pers_tipo, pers_nome, pers_src, pers_alt, pers_descricao, pers_frase, pers_data_criacao
                FROM PERSONAGENS
                WHERE pers_id = ?;
            `;

            const values = [id];
            const [rows] = await db.query(sql, values);

            if (rows.length === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Personagem ${id} não encontrado!`,
                    dados: null
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: `Personagem ${id} encontrado com sucesso!`,
                dados: rows[0]
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao buscar personagem.',
                dados: error.message
            });
        }
    },

    async cadastrarPersonagem(request, response) {
        try {
            const { usu_id, pers_tipo, pers_nome, pers_src, pers_alt, pers_descricao, pers_frase } = request.body;

            const sql = `
                INSERT INTO PERSONAGENS
                    (usu_id, pers_tipo, pers_nome, pers_src, pers_alt, pers_descricao, pers_frase)
                VALUES
                    (?, ?, ?, ?, ?, ?, ?);
            `;

            const values = [usu_id, pers_tipo, pers_nome, pers_src, pers_alt, pers_descricao, pers_frase];
            const [result] = await db.query(sql, values);

            const dados = {
                pers_id: result.insertId,
                usu_id,
                pers_tipo,
                pers_nome,
                pers_src,
                pers_alt,
                pers_descricao,
                pers_frase
            };

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Personagem cadastrado com sucesso.',
                dados: dados
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao cadastrar personagem.',
                dados: error.message
            });
        }
    },

    async editarPersonagem(request, response) {
        try {
            const { usu_id, pers_tipo, pers_nome, pers_src, pers_alt, pers_descricao, pers_frase } = request.body;
            const { id } = request.params;

            const sql = `
                UPDATE PERSONAGENS SET
                    usu_id = ?, pers_tipo = ?, pers_nome = ?, pers_src = ?, pers_alt = ?, pers_descricao = ?, pers_frase = ?
                WHERE
                    pers_id = ?;
            `;

            const values = [usu_id, pers_tipo, pers_nome, pers_src, pers_alt, pers_descricao, pers_frase, id];
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Personagem ${id} não encontrado!`,
                    dados: null
                });
            }

            const dados = {
                pers_id: id,
                usu_id,
                pers_tipo,
                pers_nome,
                pers_src,
                pers_alt,
                pers_descricao,
                pers_frase
            };

            return response.status(200).json({
                sucesso: true,
                mensagem: `Personagem ${id} atualizado com sucesso!`,
                dados: dados
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao editar personagem.',
                dados: error.message
            });
        }
    },

    async apagarPersonagem(request, response) {
        try {
            const { id } = request.params;

            const sql = `DELETE FROM PERSONAGENS WHERE pers_id = ?`;
            const values = [id];
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Personagem ${id} não encontrado!`,
                    dados: null
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: `Personagem ${id} excluído com sucesso`,
                dados: null
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao apagar personagem.',
                dados: error.message
            });
        }
    }
};
