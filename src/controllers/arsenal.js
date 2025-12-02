const db = require("../database/connection");
const { validarTipoArma, validarRaridade } = require("../utils/validacoes");
const { gerarUrl } = require("../utils/gerarUrl");
const fs = require("fs");
const path = require("path");

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

      const sql = `
                SELECT ars_id, usu_id, ars_tipo, ars_nome, ars_src, ars_alt, ars_dano, ars_raridade, 
                    ars_municao, ars_alcance, ars_taxa_disparo, ars_taxa_acerto, ars_data_criacao
                FROM ARSENAL
                ${where}
                ORDER BY ars_nome;
            `;

      const [rows] = await db.query(sql, values);

      const dados = rows.map((arma) => ({
        ...arma,
        ars_src: gerarUrl(arma.ars_src, "arsenal", "sem.jpg"),
      }));

      return response.status(200).json({
        sucesso: true,
        mensagem:
          rows.length > 0
            ? "Itens do arsenal encontrados."
            : "Nenhum item encontrado.",
        nItens: dados.length,
        dados: dados,
      });
    } catch (error) {
      return response.status(500).json({
        sucesso: false,
        mensagem: "Erro ao listar arsenal.",
        dados: error.message,
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

      const [rows] = await db.query(sql, [id]);

      if (rows.length === 0) {
        return response.status(404).json({
          sucesso: false,
          mensagem: `Item do arsenal ${id} não encontrado!`,
        });
      }

      const arma = {
        ...rows[0],
        ars_src: gerarUrl(rows[0].ars_src, "arsenal", "sem.jpg"),
      };

      return response.status(200).json({
        sucesso: true,
        mensagem: `Item do arsenal ${id} encontrado com sucesso!`,
        dados: arma,
      });
    } catch (error) {
      return response.status(500).json({
        sucesso: false,
        mensagem: "Erro ao buscar item do arsenal.",
        dados: error.message,
      });
    }
  },

  async cadastrarArsenal(request, response) {
    try {
      const {
        usu_id,
        ars_tipo,
        ars_nome,
        ars_alt,
        ars_dano,
        ars_raridade,
        ars_municao,
        ars_alcance,
        ars_taxa_disparo,
        ars_taxa_acerto,
      } = request.body;
      const imagem = request.file; 

      // Validações
      if (!usu_id || !ars_tipo || !ars_nome) {
        return response.status(400).json({
          sucesso: false,
          mensagem: "Campos obrigatórios: usu_id, tipo e nome.",
        });
      }

      if (!validarTipoArma(ars_tipo)) {
        return response.status(400).json({
          sucesso: false,
          mensagem: "Tipo de arma inválido. Use: 0=pistola, 1=faca, 2=rifle.",
        });
      }

      if (ars_raridade && !validarRaridade(ars_raridade)) {
        return response.status(400).json({
          sucesso: false,
          mensagem: "Raridade inválida. Use: Comum, Raro, Épico ou Lendário.",
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
                INSERT INTO ARSENAL
                    (usu_id, ars_tipo, ars_nome, ars_src, ars_alt, ars_dano, ars_raridade, 
                     ars_municao, ars_alcance, ars_taxa_disparo, ars_taxa_acerto)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            `;

      const values = [
        usu_id,
        ars_tipo,
        ars_nome,
        imagem ? imagem.filename : null,
        ars_alt,
        ars_dano,
        ars_raridade,
        ars_municao,
        ars_alcance,
        ars_taxa_disparo,
        ars_taxa_acerto,
      ];

      const [result] = await db.query(sql, values);

      return response.status(201).json({
        sucesso: true,
        mensagem: "Item do arsenal cadastrado com sucesso.",
        dados: {
          ars_id: result.insertId,
          usu_id,
          ars_tipo,
          ars_nome,
          ars_src: imagem
            ? gerarUrl(imagem.filename, "arsenal", "sem.jpg")
            : null,
          ars_alt,
          ars_dano,
          ars_raridade,
          ars_municao,
          ars_alcance,
          ars_taxa_disparo,
          ars_taxa_acerto,
        },
      });
    } catch (error) {
      return response.status(500).json({
        sucesso: false,
        mensagem: "Erro ao cadastrar item do arsenal.",
        dados: error.message,
      });
    }
  },

  async editarArsenal(request, response) {
    try {
      const {
        usu_id,
        ars_tipo,
        ars_nome,
        ars_alt,
        ars_dano,
        ars_raridade,
        ars_municao,
        ars_alcance,
        ars_taxa_disparo,
        ars_taxa_acerto,
      } = request.body;
      const imagem = request.file;
      const { id } = request.params;

      // Buscar item atual
      const [itemAtual] = await db.query(
        "SELECT ars_src FROM ARSENAL WHERE ars_id = ?",
        [id]
      );

      if (itemAtual.length === 0) {
        return response.status(404).json({
          sucesso: false,
          mensagem: `Item do arsenal ${id} não encontrado!`,
        });
      }

      if (imagem && itemAtual[0].ars_src) {
        const caminhoImagemAntiga = path.join(
          __dirname,
          "../../public/arsenal",
          itemAtual[0].ars_src
        );

        if (
          fs.existsSync(caminhoImagemAntiga) &&
          itemAtual[0].ars_src !== "sem.jpg"
        ) {
          fs.unlinkSync(caminhoImagemAntiga);
          console.log(`🗑️ Imagem antiga excluída: ${itemAtual[0].ars_src}`);
        }
      }

      // Validações
      if (ars_tipo && !validarTipoArma(ars_tipo)) {
        return response.status(400).json({
          sucesso: false,
          mensagem: "Tipo de arma inválido.",
        });
      }

      if (ars_raridade && !validarRaridade(ars_raridade)) {
        return response.status(400).json({
          sucesso: false,
          mensagem: "Raridade inválida.",
        });
      }

      // Se enviou nova imagem, usa ela. Senão, mantém a atual.
      const nomeImagem = imagem ? imagem.filename : itemAtual[0].ars_src;

      const sql = `
            UPDATE ARSENAL SET
                usu_id = COALESCE(?, usu_id),
                ars_tipo = COALESCE(?, ars_tipo),
                ars_nome = COALESCE(?, ars_nome),
                ars_src = ?,
                ars_alt = COALESCE(?, ars_alt),
                ars_dano = COALESCE(?, ars_dano),
                ars_raridade = COALESCE(?, ars_raridade),
                ars_municao = COALESCE(?, ars_municao),
                ars_alcance = COALESCE(?, ars_alcance),
                ars_taxa_disparo = COALESCE(?, ars_taxa_disparo),
                ars_taxa_acerto = COALESCE(?, ars_taxa_acerto)
            WHERE ars_id = ?;
        `;

      const values = [
        usu_id,
        ars_tipo,
        ars_nome,
        nomeImagem,
        ars_alt,
        ars_dano,
        ars_raridade,
        ars_municao,
        ars_alcance,
        ars_taxa_disparo,
        ars_taxa_acerto,
        id,
      ];

      const [result] = await db.query(sql, values);

      if (result.affectedRows === 0) {
        return response.status(404).json({
          sucesso: false,
          mensagem: `Item do arsenal ${id} não encontrado!`,
        });
      }

      return response.status(200).json({
        sucesso: true,
        mensagem: `Item do arsenal ${id} atualizado com sucesso!`,
        dados: {
          ars_src: gerarUrl(nomeImagem, "arsenal", "sem.jpg"),
        },
      });
    } catch (error) {
      return response.status(500).json({
        sucesso: false,
        mensagem: "Erro ao editar item do arsenal.",
        dados: error.message,
      });
    }
  },

  async apagarArsenal(request, response) {
    try {
      const { id } = request.params;

      const sql = `DELETE FROM ARSENAL WHERE ars_id = ?`;
      const [result] = await db.query(sql, [id]);

      if (result.affectedRows === 0) {
        return response.status(404).json({
          sucesso: false,
          mensagem: `Item do arsenal ${id} não encontrado!`,
        });
      }

      return response.status(200).json({
        sucesso: true,
        mensagem: `Item do arsenal ${id} excluído com sucesso`,
      });
    } catch (error) {
      return response.status(500).json({
        sucesso: false,
        mensagem: "Erro ao apagar item do arsenal.",
        dados: error.message,
      });
    }
  },
};
