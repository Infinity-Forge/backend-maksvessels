const db = require('../database/connection');

module.exports = {
    async listarMapas(request, response) {
        try {
            const { nome, page = 1, limit = 10 } = request.query;
            const offset = (parseInt(page) - 1) * parseInt(limit);

            let where = "WHERE 1=1";
            const values = [];

            if (nome) {
                where += " AND mapa_nome LIKE ?";
                values.push(`%${nome}%`);
            }

            const [[{ total }]] = await db.query(`SELECT COUNT(*) as total FROM MAPAS ${where}`, values);

            const sql = `
                SELECT mapa_id, usu_id, mapa_src, mapa_alt, mapa_nome, mapa_descricao, mapa_data_criacao
                FROM MAPAS
                ${where}
                ORDER BY mapa_nome
                LIMIT ? OFFSET ?
            `;
            values.push(parseInt(limit), offset);

            const [rows] = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: rows.length > 0 ? 'Mapas encontrados.' : 'Nenhum mapa encontrado.',
                nItens: rows.length,
                total,
                dados: rows
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao listar mapas.',
                dados: error.message
            });
        }
    },

    async cadastrarMapa(request, response) {
        try {
            const { usu_id, mapa_src, mapa_alt, mapa_nome, mapa_descricao } = request.body;

            const sql = `
                INSERT INTO MAPAS
                    (usu_id, mapa_src, mapa_alt, mapa_nome, mapa_descricao)
                VALUES
                    (?, ?, ?, ?, ?);
            `;

            const values = [usu_id, mapa_src, mapa_alt, mapa_nome, mapa_descricao];
            const [result] = await db.query(sql, values);

            const dados = {
                mapa_id: result.insertId,
                usu_id,
                mapa_src,
                mapa_alt,
                mapa_nome,
                mapa_descricao
            };

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Mapa cadastrado com sucesso.',
                dados: dados
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao cadastrar mapa.',
                dados: error.message
            });
        }
    },

    async editarMapa(request, response) {
        try {
            const { usu_id, mapa_src, mapa_alt, mapa_nome, mapa_descricao } = request.body;
            const { id } = request.params;

            const sql = `
                UPDATE MAPAS SET
                    usu_id = ?, mapa_src = ?, mapa_alt = ?, mapa_nome = ?, mapa_descricao = ?
                WHERE
                    mapa_id = ?;
            `;

            const values = [usu_id, mapa_src, mapa_alt, mapa_nome, mapa_descricao, id];
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Mapa ${id} não encontrado!`,
                    dados: null
                });
            }

            const dados = {
                mapa_id: id,
                usu_id,
                mapa_src,
                mapa_alt,
                mapa_nome,
                mapa_descricao
            };

            return response.status(200).json({
                sucesso: true,
                mensagem: `Mapa ${id} atualizado com sucesso!`,
                dados: dados
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao editar mapa.',
                dados: error.message
            });
        }
    },

    async apagarMapa(request, response) {
        try {
            const { id } = request.params;

            const sql = `DELETE FROM MAPAS WHERE mapa_id = ?`;
            const values = [id];
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Mapa ${id} não encontrado!`,
                    dados: null
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: `Mapa ${id} excluído com sucesso`,
                dados: null
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao apagar mapa.',
                dados: error.message
            });
        }
    }
};
