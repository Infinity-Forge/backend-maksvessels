const db = require('../database/connection');

module.exports = {
    async listarArsenal(request, response) {
        try {
            const { nome, tipo, raridade } = request.query;

            let where = "WHERE 1=1";
            const values = [];

            if (nome) {
                where += " AND ars_nome LIKE ?";
                values.push(`%${nome}%`);
            }
            if (tipo !== undefined) {
                where += " AND ars_tipo = ?";
                values.push(tipo);
            }
            if (raridade) {
                where += " AND ars_raridade = ?";
                values.push(raridade);
            }

            const [[{ total }]] = await db.query(`SELECT COUNT(*) as total FROM ARSENAL ${where}`, values);

            const sql = `
                SELECT ars_id, usu_id, ars_tipo, ars_nome, ars_src, ars_alt, ars_dano, ars_raridade, 
                    ars_municao, ars_alcance, ars_taxa_disparo, ars_taxa_acerto, ars_data_criacao
                FROM ARSENAL
                ${where}
                ORDER BY ars_nome
            `;

            const [rows] = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: rows.length > 0 ? 'Itens do arsenal encontrados.' : 'Nenhum item encontrado.',
                nItens: rows.length,
                total,
                dados: rows
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao listar arsenal.',
                dados: error.message
            });
        }
    },

    async listarArmaPorId(request, response) {
        try {
            const { id } = request.params;

            const sql = `
                SELECT ars_id, usu_id, ars_tipo, ars_nome, ars_src, ars_alt, ars_dano, ars_raridade, 
                    ars_municao, ars_alcance, ars_taxa_disparo, ars_taxa_acerto, ars_data_criacao
                FROM ARSENAL
                WHERE ars_id = ?;
            `;

            const values = [id];
            const [rows] = await db.query(sql, values);

            if (rows.length === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Item de arsenal ${id} não encontrado!`,
                    dados: null
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: `Item de arsenal ${id} encontrado com sucesso!`,
                dados: rows[0]
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao buscar item do arsenal.',
                dados: error.message
            });
        }
    },

    async cadastrarArsenal(request, response) {
        try {
            const { 
                usu_id, ars_tipo, ars_nome, ars_src, ars_alt, ars_dano, 
                ars_raridade, ars_municao, ars_alcance, ars_taxa_disparo, ars_taxa_acerto 
            } = request.body;

            const sql = `
                INSERT INTO ARSENAL
                    (usu_id, ars_tipo, ars_nome, ars_src, ars_alt, ars_dano, ars_raridade, 
                     ars_municao, ars_alcance, ars_taxa_disparo, ars_taxa_acerto)
                VALUES
                    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            `;

            const values = [
                usu_id, ars_tipo, ars_nome, ars_src, ars_alt, ars_dano, ars_raridade,
                ars_municao, ars_alcance, ars_taxa_disparo, ars_taxa_acerto
            ];

            const [result] = await db.query(sql, values);

            const dados = {
                ars_id: result.insertId,
                usu_id,
                ars_tipo,
                ars_nome,
                ars_src,
                ars_alt,
                ars_dano,
                ars_raridade,
                ars_municao,
                ars_alcance,
                ars_taxa_disparo,
                ars_taxa_acerto
            };

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Item do arsenal cadastrado com sucesso.',
                dados: dados
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao cadastrar item do arsenal.',
                dados: error.message
            });
        }
    },

    async editarArsenal(request, response) {
        try {
            const { 
                usu_id, ars_tipo, ars_nome, ars_src, ars_alt, ars_dano, 
                ars_raridade, ars_municao, ars_alcance, ars_taxa_disparo, ars_taxa_acerto 
            } = request.body;
            const { id } = request.params;

            const sql = `
                UPDATE ARSENAL SET
                    usu_id = ?, ars_tipo = ?, ars_nome = ?, ars_src = ?, ars_alt = ?, 
                    ars_dano = ?, ars_raridade = ?, ars_municao = ?, ars_alcance = ?, 
                    ars_taxa_disparo = ?, ars_taxa_acerto = ?
                WHERE
                    ars_id = ?;
            `;

            const values = [
                usu_id, ars_tipo, ars_nome, ars_src, ars_alt, ars_dano, ars_raridade,
                ars_municao, ars_alcance, ars_taxa_disparo, ars_taxa_acerto, id
            ];

            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Item do arsenal ${id} não encontrado!`,
                    dados: null
                });
            }

            const dados = {
                ars_id: id,
                usu_id,
                ars_tipo,
                ars_nome,
                ars_src,
                ars_alt,
                ars_dano,
                ars_raridade,
                ars_municao,
                ars_alcance,
                ars_taxa_disparo,
                ars_taxa_acerto
            };

            return response.status(200).json({
                sucesso: true,
                mensagem: `Item do arsenal ${id} atualizado com sucesso!`,
                dados: dados
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao editar item do arsenal.',
                dados: error.message
            });
        }
    },

    async apagarArsenal(request, response) {
        try {
            const { id } = request.params;

            const sql = `DELETE FROM ARSENAL WHERE ars_id = ?`;
            const values = [id];
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Item do arsenal ${id} não encontrado!`,
                    dados: null
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: `Item do arsenal ${id} excluído com sucesso`,
                dados: null
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao apagar item do arsenal.',
                dados: error.message
            });
        }
    }
};
