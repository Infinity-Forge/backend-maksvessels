const db = require('../database/connection');
const { gerarUrl } = require('../utils/gerarUrl'); 

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

            // ⬇️ MODIFIQUE ESTA PARTE ⬇️
            const dados = rows.map(mapa => ({
                ...mapa,
                mapa_src: gerarUrl(mapa.mapa_src, 'mapas', 'sem.jpg')
            }));

            return response.status(200).json({
                sucesso: true,
                mensagem: rows.length > 0 ? 'Mapas encontrados.' : 'Nenhum mapa encontrado.',
                nItens: dados.length,
                total,
                dados: dados
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao listar mapas.',
                dados: error.message
            });
        }
    },

    async listarMapaPorId(request, response) {
        try {
            const { id } = request.params;

            const sql = `
                SELECT mapa_id, usu_id, mapa_src, mapa_alt, mapa_nome, mapa_descricao, mapa_data_criacao
                FROM MAPAS
                WHERE mapa_id = ?;
            `;

            const [rows] = await db.query(sql, [id]);

            if (rows.length === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Mapa ${id} não encontrado!`
                });
            }

            // ⬇️ APLICA A FUNÇÃO gerarUrl ⬇️
            const mapa = {
                ...rows[0],
                mapa_src: gerarUrl(rows[0].mapa_src, 'mapas', 'sem.jpg')
            };

            return response.status(200).json({
                sucesso: true,
                mensagem: `Mapa ${id} encontrado com sucesso!`,
                dados: mapa
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao buscar mapa.',
                dados: error.message
            });
        }
    },

    async cadastrarMapa(request, response) {
        try {
            const { usu_id, mapa_alt, mapa_nome, mapa_descricao } = request.body;
            const imagem = request.file; // ⬅️ AGORA VEM DO UPLOAD

            // Validações
            if (!usu_id || !mapa_nome) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Campos obrigatórios: usu_id e nome.'
                });
            }

            // Verificar usuário
            const [usuario] = await db.query(
                'SELECT usu_id FROM USUARIOS WHERE usu_id = ? AND usu_ativo = 1',
                [usu_id]
            );

            if (usuario.length === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: 'Usuário não encontrado ou inativo.'
                });
            }

            const sql = `
                INSERT INTO MAPAS
                    (usu_id, mapa_src, mapa_alt, mapa_nome, mapa_descricao)
                VALUES (?, ?, ?, ?, ?);
            `;

            // ⬇️ MODIFICADO: imagem.filename em vez de mapa_src do body
            const values = [usu_id, imagem ? imagem.filename : null, mapa_alt, mapa_nome, mapa_descricao];
            const [result] = await db.query(sql, values);

            return response.status(201).json({
                sucesso: true,
                mensagem: 'Mapa cadastrado com sucesso.',
                dados: {
                    mapa_id: result.insertId,
                    usu_id,
                    mapa_src: imagem ? gerarUrl(imagem.filename, 'mapas', 'sem.jpg') : null,
                    mapa_alt,
                    mapa_nome,
                    mapa_descricao
                }
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
            const { usu_id, mapa_alt, mapa_nome, mapa_descricao } = request.body;
            const imagem = request.file; // ⬅️ AGORA RECEBE UPLOAD
            const { id } = request.params;

            // Buscar mapa atual
            const [mapaAtual] = await db.query(
                'SELECT mapa_src FROM MAPAS WHERE mapa_id = ?',
                [id]
            );

            if (mapaAtual.length === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Mapa ${id} não encontrado!`
                });
            }

            // Se enviou nova imagem, usa ela. Senão, mantém a atual.
            const nomeImagem = imagem ? imagem.filename : mapaAtual[0].mapa_src;

            const sql = `
                UPDATE MAPAS SET
                    usu_id = COALESCE(?, usu_id),
                    mapa_src = ?,
                    mapa_alt = COALESCE(?, mapa_alt),
                    mapa_nome = COALESCE(?, mapa_nome),
                    mapa_descricao = COALESCE(?, mapa_descricao)
                WHERE mapa_id = ?;
            `;

            const values = [usu_id, nomeImagem, mapa_alt, mapa_nome, mapa_descricao, id];
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Mapa ${id} não encontrado!`
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: `Mapa ${id} atualizado com sucesso!`,
                dados: {
                    mapa_src: gerarUrl(nomeImagem, 'mapas', 'sem.jpg')
                }
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
            const [result] = await db.query(sql, [id]);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Mapa ${id} não encontrado!`
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: `Mapa ${id} excluído com sucesso`
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