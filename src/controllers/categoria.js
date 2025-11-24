const db = require('../database/connection');

module.exports = {
    async listarCategoria(request, response) {
        try {
            const { nome, page = 1, limit = 10 } = request.query;
            const offset = (parseInt(page) - 1) * parseInt(limit);

            let where = "WHERE 1=1";
            const values = [];

            if (nome) {
                where += " AND cat_nome LIKE ?";
                values.push(`%${nome}%`);
            }

            const [[{ total }]] = await db.query(`SELECT COUNT(*) as total FROM CATEGORIA ${where}`, values);

            const sql = `
                SELECT cat_id, cat_nome
                FROM CATEGORIA
                ${where}
                ORDER BY cat_nome
                LIMIT ? OFFSET ?
            `;
            values.push(parseInt(limit), offset);

            const [rows] = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: rows.length > 0 ? 'Categorias encontradas.' : 'Nenhuma categoria encontrada.',
                nItens: rows.length,
                total,
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

            if (!cat_nome) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Campo obrigatório: nome.'
                });
            }

            // Verificar se categoria já existe
            const [categoriaExistente] = await db.query(
                'SELECT cat_id FROM CATEGORIA WHERE cat_nome = ?',
                [cat_nome]
            );

            if (categoriaExistente.length > 0) {
                return response.status(409).json({
                    sucesso: false,
                    mensagem: 'Categoria já existe.'
                });
            }

            const sql = `INSERT INTO CATEGORIA (cat_nome) VALUES (?)`;
            const [result] = await db.query(sql, [cat_nome]);

            return response.status(201).json({
                sucesso: true,
                mensagem: 'Categoria cadastrada com sucesso.',
                dados: {
                    cat_id: result.insertId,
                    cat_nome
                }
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao cadastrar categoria.',
                dados: error.message
            });
        }
    },

    async editarCategoria(request, response) {
        try {
            const { cat_nome } = request.body;
            const { id } = request.params;

            if (!cat_nome) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Campo obrigatório: nome.'
                });
            }

            // Verificar se categoria já existe (excluindo a atual)
            const [categoriaExistente] = await db.query(
                'SELECT cat_id FROM CATEGORIA WHERE cat_nome = ? AND cat_id != ?',
                [cat_nome, id]
            );

            if (categoriaExistente.length > 0) {
                return response.status(409).json({
                    sucesso: false,
                    mensagem: 'Categoria já existe.'
                });
            }

            const sql = `UPDATE CATEGORIA SET cat_nome = ? WHERE cat_id = ?`;
            const [result] = await db.query(sql, [cat_nome, id]);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Categoria ${id} não encontrada.`
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: `Categoria ${id} atualizada com sucesso!`
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao editar categoria.',
                dados: error.message
            });
        }
    },

    async apagarCategoria(request, response) {
        try {
            const { id } = request.params;

            const sql = `DELETE FROM CATEGORIA WHERE cat_id = ?`;
            const [result] = await db.query(sql, [id]);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Categoria ${id} não encontrada.`
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: `Categoria ${id} excluída com sucesso!`
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao excluir categoria.',
                dados: error.message
            });
        }
    }
};