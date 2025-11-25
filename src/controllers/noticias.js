const db = require("../database/connection");
const { gerarUrl } = require("../utils/gerarUrl");
const fs = require("fs");
const path = require("path");

module.exports = {
  async listarNoticias(request, response) {
    try {
      const {
        titulo,
        autor,
        data_inicio,
        data_fim,
        page = 1,
        limit = 10,
      } = request.query;
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

      const [[{ total }]] = await db.query(
        `SELECT COUNT(*) as total FROM NOTICIAS ${where}`,
        values
      );

      const sql = `
                SELECT not_id, usu_id, not_titulo, not_conteudo, not_imagem, not_data_publicacao
                FROM NOTICIAS
                ${where}
                ORDER BY not_data_publicacao DESC
                LIMIT ? OFFSET ?
            `;
      values.push(parseInt(limit), offset);

      const [rows] = await db.query(sql, values);

      // ⬇️ MODIFIQUE ESTA PARTE ⬇️
      const dados = rows.map((noticia) => ({
        ...noticia,
        not_imagem: gerarUrl(noticia.not_imagem, "noticias", "sem.jpg"),
      }));

      return response.status(200).json({
        sucesso: true,
        mensagem:
          rows.length > 0
            ? "Notícias encontradas."
            : "Nenhuma notícia encontrada.",
        nItens: dados.length,
        total,
        dados: dados, // ⬅️ Use 'dados' em vez de 'rows'
      });
    } catch (error) {
      return response.status(500).json({
        sucesso: false,
        mensagem: "Erro ao listar notícias.",
        dados: error.message,
      });
    }
  },

  async cadastrarNoticias(request, response) {
    try {
      const { usu_id, not_titulo, not_conteudo } = request.body;
      const imagem = request.file; // ⬅️ AGORA VEM DO UPLOAD

      // Validações
      if (!usu_id || !not_titulo || !not_conteudo) {
        return response.status(400).json({
          sucesso: false,
          mensagem: "Campos obrigatórios: usu_id, título e conteúdo.",
        });
      }

      // Verificar usuário
      const [usuario] = await db.query(
        "SELECT usu_id FROM USUARIOS WHERE usu_id = ? AND usu_ativo = 1",
        [usu_id]
      );

      if (usuario.length === 0) {
        return response.status(404).json({
          sucesso: false,
          mensagem: "Usuário não encontrado ou inativo.",
        });
      }

      const sql = `
                INSERT INTO NOTICIAS
                 (usu_id, not_titulo, not_conteudo, not_imagem) 
                VALUES (?, ?, ?, ?);
            `;

      // ⬇️ MODIFICADO: imagem.filename em vez de not_imagem do body
      const values = [
        usu_id,
        not_titulo,
        not_conteudo,
        imagem ? imagem.filename : null,
      ];
      const [result] = await db.query(sql, values);

      return response.status(201).json({
        sucesso: true,
        mensagem: "Notícia cadastrada com sucesso.",
        dados: {
          not_id: result.insertId,
          usu_id,
          not_titulo,
          not_conteudo,
          not_imagem: imagem
            ? gerarUrl(imagem.filename, "noticias", "sem.jpg")
            : null,
        },
      });
    } catch (error) {
      return response.status(500).json({
        sucesso: false,
        mensagem: "Erro ao cadastrar notícia.",
        dados: error.message,
      });
    }
  },

  async editarNoticias(request, response) {
    try {
      const { usu_id, not_titulo, not_conteudo } = request.body;
      const imagem = request.file;
      const { id } = request.params;

      // Buscar a notícia atual
      const [noticiaAtual] = await db.query(
        "SELECT not_imagem FROM NOTICIAS WHERE not_id = ?",
        [id]
      );

      if (noticiaAtual.length === 0) {
        return response.status(404).json({
          sucesso: false,
          mensagem: `Notícia ${id} não encontrada.`,
        });
      }

      // ⬇️ EXCLUSÃO DA IMAGEM ANTIGA ⬇️
      if (imagem && noticiaAtual[0].not_imagem) {
        const caminhoImagemAntiga = path.join(
          __dirname,
          "../../public/noticias",
          noticiaAtual[0].not_imagem
        );

        if (
          fs.existsSync(caminhoImagemAntiga) &&
          noticiaAtual[0].not_imagem !== "sem.jpg"
        ) {
          fs.unlinkSync(caminhoImagemAntiga);
          console.log(
            `🗑️ Imagem antiga excluída: ${noticiaAtual[0].not_imagem}`
          );
        }
      }

      // Se enviou nova imagem, usa ela. Senão, mantém a atual.
      const nomeImagem = imagem ? imagem.filename : noticiaAtual[0].not_imagem;

      const sql = `
            UPDATE NOTICIAS SET
                usu_id = COALESCE(?, usu_id),
                not_titulo = COALESCE(?, not_titulo),
                not_conteudo = COALESCE(?, not_conteudo),
                not_imagem = ?
            WHERE not_id = ?;
        `;

      const values = [usu_id, not_titulo, not_conteudo, nomeImagem, id];
      const [result] = await db.query(sql, values);

      if (result.affectedRows === 0) {
        return response.status(404).json({
          sucesso: false,
          mensagem: `Notícia ${id} não encontrada.`,
        });
      }

      return response.status(200).json({
        sucesso: true,
        mensagem: `Notícia ${id} atualizada com sucesso!`,
        dados: {
          not_imagem: gerarUrl(nomeImagem, "noticias", "sem.jpg"),
        },
      });
    } catch (error) {
      return response.status(500).json({
        sucesso: false,
        mensagem: "Erro ao editar notícia.",
        dados: error.message,
      });
    }
  },

  async apagarNoticias(request, response) {
    try {
      const { id } = request.params;

      const sql = `DELETE FROM NOTICIAS WHERE not_id = ?`;
      const [result] = await db.query(sql, [id]);

      if (result.affectedRows === 0) {
        return response.status(404).json({
          sucesso: false,
          mensagem: `Notícia ${id} não encontrada!`,
        });
      }

      return response.status(200).json({
        sucesso: true,
        mensagem: `Notícia ${id} excluída com sucesso`,
      });
    } catch (error) {
      return response.status(500).json({
        sucesso: false,
        mensagem: "Erro ao excluir notícia.",
        dados: error.message,
      });
    }
  },
};
