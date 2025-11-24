const db = require('../database/connection');

module.exports = {
    async listarCompartilhamento(request, response) {
        try {
            const { noticia, plataforma, page = 1, limit = 10 } = request.query;
            const offset = (parseInt(page) - 1) * parseInt(limit);

            let where = "WHERE 1=1";
            const values = [];

            if (noticia) {
                where += " AND not_id = ?";
                values.push(noticia);
            }
            if (plataforma) {
                where += " AND comp_plataforma LIKE ?";
                values.push(`%${plataforma}%`);
            }

            const [[{ total }]] = await db.query(`SELECT COUNT(*) as total FROM COMPARTILHAMENTO ${where}`, values);

            const sql = `
                SELECT comp_id, not_id, comp_plataforma, comp_data
                FROM COMPARTILHAMENTO
                ${where}
                ORDER BY comp_data DESC
                LIMIT ? OFFSET ?
            `;
            values.push(parseInt(limit), offset);

            const [rows] = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: rows.length > 0 ? 'Compartilhamentos encontrados.' : 'Nenhum compartilhamento encontrado.',
                nItens: rows.length,
                total,
                dados: rows
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao listar compartilhamentos.',
                dados: error.message
            });
        }
    },

    async cadastrarCompartilhamento(request, response) {
        try {
            const { not_id, comp_plataforma } = request.body;

            // Validações
            if (!not_id || !comp_plataforma) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Campos obrigatórios: not_id e plataforma.'
                });
            }

            // Verificar se notícia existe
            const [noticia] = await db.query(
                'SELECT not_id FROM NOTICIAS WHERE not_id = ?',
                [not_id]
            );

            if (noticia.length === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: 'Notícia não encontrada.'
                });
            }

            const sql = `
                INSERT INTO COMPARTILHAMENTO (not_id, comp_plataforma)
                VALUES (?, ?);
            `;

            const values = [not_id, comp_plataforma];
            const [result] = await db.query(sql, values);

            return response.status(201).json({
                sucesso: true, 
                mensagem: 'Compartilhamento registrado com sucesso.', 
                dados: {
                    comp_id: result.insertId,
                    not_id,
                    comp_plataforma
                }
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro ao registrar compartilhamento.', 
                dados: error.message
            });
        }
    },

    async editarCompartilhamento(request, response) {
        try {
            const { not_id, comp_plataforma } = request.body;
            const { comp_id } = request.params;

            // Verificar se notícia existe
            if (not_id) {
                const [noticia] = await db.query(
                    'SELECT not_id FROM NOTICIAS WHERE not_id = ?',
                    [not_id]
                );

                if (noticia.length === 0) {
                    return response.status(404).json({
                        sucesso: false,
                        mensagem: 'Notícia não encontrada.'
                    });
                }
            }

            const sql = `
                UPDATE COMPARTILHAMENTO SET
                    not_id = COALESCE(?, not_id),
                    comp_plataforma = COALESCE(?, comp_plataforma)
                WHERE comp_id = ?;
            `;

            const values = [not_id, comp_plataforma, comp_id];
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false, 
                    mensagem: 'Compartilhamento não encontrado.'
                });
            }

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Compartilhamento atualizado com sucesso!'
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro ao atualizar compartilhamento.', 
                dados: error.message
            });
        }
    },

    async apagarCompartilhamento(request, response) {
        try {
            const { comp_id } = request.params;
            
            const sql = `DELETE FROM COMPARTILHAMENTO WHERE comp_id = ?`;
            const [result] = await db.query(sql, [comp_id]);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false, 
                    mensagem: 'Compartilhamento não encontrado.'
                });
            }

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Compartilhamento excluído com sucesso!'
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro ao excluir compartilhamento.', 
                dados: error.message
            });
        }
    }
};