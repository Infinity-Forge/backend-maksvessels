const db = require("../database/connection");
const { validarTipoPersonagem } = require("../utils/validacoes");
const { gerarUrl } = require("../utils/gerarUrl"); 
const fs = require("fs");
const path = require("path");

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

      const sql = `
                SELECT pers_id, usu_id, pers_tipo, pers_nome, pers_src, pers_alt, 
                       pers_descricao, pers_frase, pers_data_criacao
                FROM PERSONAGENS
                ${where}
                ORDER BY pers_nome;
            `;

      const [rows] = await db.query(sql, values);

      const dados = rows.map((personagem) => ({
        ...personagem,
        pers_src: gerarUrl(personagem.pers_src, "personagens", "sem.jpg"),
      }));

      return response.status(200).json({
        sucesso: true,
        mensagem:
          rows.length > 0
            ? "Personagens encontrados."
            : "Nenhum personagem encontrado.",
        nItens: dados.length,
        dados: dados,
      });
    } catch (error) {
      return response.status(500).json({
        sucesso: false,
        mensagem: "Erro ao listar personagens.",
        dados: error.message,
      });
    }
  },

  async listarPersonagemPorId(request, response) {
    try {
      const { id } = request.params;

      const sql = `
            SELECT pers_id, usu_id, pers_tipo, pers_nome, pers_src, pers_alt, 
                   pers_descricao, pers_frase, pers_data_criacao
            FROM PERSONAGENS
            WHERE pers_id = ?;
        `;

      const [rows] = await db.query(sql, [id]);

      if (rows.length === 0) {
        return response.status(404).json({
          sucesso: false,
          mensagem: `Personagem ${id} não encontrado!`,
        });
      }

      const personagem = {
        ...rows[0],
        pers_src: gerarUrl(rows[0].pers_src, "personagens", "sem.jpg"),
      };

      return response.status(200).json({
        sucesso: true,
        mensagem: `Personagem ${id} encontrado com sucesso!`,
        dados: personagem,
      });
    } catch (error) {
      return response.status(500).json({
        sucesso: false,
        mensagem: "Erro ao buscar personagem.",
        dados: error.message,
      });
    }
  },

  async cadastrarPersonagem(request, response) {
    try {
      const {
        usu_id,
        pers_tipo,
        pers_nome,
        pers_alt,
        pers_descricao,
        pers_frase,
      } = request.body;
      const imagem = request.file; 

      // Validações
      if (!usu_id || !pers_tipo || !pers_nome) {
        return response.status(400).json({
          sucesso: false,
          mensagem: "Campos obrigatórios: usu_id, tipo e nome.",
        });
      }

      if (!validarTipoPersonagem(pers_tipo)) {
        return response.status(400).json({
          sucesso: false,
          mensagem:
            "Tipo de personagem inválido. Use: 0=guardião, 1=cavaleiro, 2=anjo, 3=inimigo.",
        });
      }

      // Verificar se usuário existe
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
                INSERT INTO PERSONAGENS
                    (usu_id, pers_tipo, pers_nome, pers_src, pers_alt, pers_descricao, pers_frase)
                VALUES (?, ?, ?, ?, ?, ?, ?);
            `;

      const values = [
        usu_id,
        pers_tipo,
        pers_nome,
        imagem ? imagem.filename : null,
        pers_alt,
        pers_descricao,
        pers_frase,
      ];
      const [result] = await db.query(sql, values);

      return response.status(201).json({
        sucesso: true,
        mensagem: "Personagem cadastrado com sucesso.",
        dados: {
          pers_id: result.insertId,
          usu_id,
          pers_tipo,
          pers_nome,
          pers_src: imagem
            ? gerarUrl(imagem.filename, "personagens", "sem.jpg")
            : null,
          pers_alt,
          pers_descricao,
          pers_frase,
        },
      });
    } catch (error) {
      return response.status(500).json({
        sucesso: false,
        mensagem: "Erro ao cadastrar personagem.",
        dados: error.message,
      });
    }
  },

  async editarPersonagem(request, response) {
    try {
      const {
        usu_id,
        pers_tipo,
        pers_nome,
        pers_alt,
        pers_descricao,
        pers_frase,
      } = request.body;
      const imagem = request.file;
      const { id } = request.params;

      // Buscar personagem atual
      const [personagemAtual] = await db.query(
        "SELECT pers_src FROM PERSONAGENS WHERE pers_id = ?",
        [id]
      );

      if (personagemAtual.length === 0) {
        return response.status(404).json({
          sucesso: false,
          mensagem: `Personagem ${id} não encontrado!`,
        });
      }

      if (imagem && personagemAtual[0].pers_src) {
        const caminhoImagemAntiga = path.join(
          __dirname,
          "../../public/personagens",
          personagemAtual[0].pers_src
        );

        if (
          fs.existsSync(caminhoImagemAntiga) &&
          personagemAtual[0].pers_src !== "sem.jpg"
        ) {
          fs.unlinkSync(caminhoImagemAntiga);
          console.log(
            `🗑️ Imagem antiga excluída: ${personagemAtual[0].pers_src}`
          );
        }
      }

      // Validações
      if (pers_tipo && !validarTipoPersonagem(pers_tipo)) {
        return response.status(400).json({
          sucesso: false,
          mensagem: "Tipo de personagem inválido.",
        });
      }

      // Se enviou nova imagem, usa ela. Senão, mantém a atual.
      const nomeImagem = imagem ? imagem.filename : personagemAtual[0].pers_src;

      const sql = `
            UPDATE PERSONAGENS SET
                usu_id = COALESCE(?, usu_id),
                pers_tipo = COALESCE(?, pers_tipo),
                pers_nome = COALESCE(?, pers_nome),
                pers_src = ?,
                pers_alt = COALESCE(?, pers_alt),
                pers_descricao = COALESCE(?, pers_descricao),
                pers_frase = COALESCE(?, pers_frase)
            WHERE pers_id = ?;
        `;

      const values = [
        usu_id,
        pers_tipo,
        pers_nome,
        nomeImagem,
        pers_alt,
        pers_descricao,
        pers_frase,
        id,
      ];
      const [result] = await db.query(sql, values);

      if (result.affectedRows === 0) {
        return response.status(404).json({
          sucesso: false,
          mensagem: `Personagem ${id} não encontrado!`,
        });
      }

      return response.status(200).json({
        sucesso: true,
        mensagem: `Personagem ${id} atualizado com sucesso!`,
        dados: {
          pers_src: gerarUrl(nomeImagem, "personagens", "sem.jpg"),
        },
      });
    } catch (error) {
      return response.status(500).json({
        sucesso: false,
        mensagem: "Erro ao editar personagem.",
        dados: error.message,
      });
    }
  },

  async apagarPersonagem(request, response) {
    try {
      const { id } = request.params;

      const sql = `DELETE FROM PERSONAGENS WHERE pers_id = ?`;
      const [result] = await db.query(sql, [id]);

      if (result.affectedRows === 0) {
        return response.status(404).json({
          sucesso: false,
          mensagem: `Personagem ${id} não encontrado!`,
        });
      }

      return response.status(200).json({
        sucesso: true,
        mensagem: `Personagem ${id} excluído com sucesso`,
      });
    } catch (error) {
      return response.status(500).json({
        sucesso: false,
        mensagem: "Erro ao apagar personagem.",
        dados: error.message,
      });
    }
  },
};
