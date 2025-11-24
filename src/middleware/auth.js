const db = require('../database/connection');
const jwt = require("jsonwebtoken");

const autenticar = async (request, response, next) => {
    try {
        const token = request.headers.authorization;

        if (token.startsWith("Bearer ")) {
            token = token.replace("Bearer ", "");
        }

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return response.status(401).json({
                sucesso: false,
                mensagem: "Token de autenticação necessário."
            });
        }

        // Decodifica o token JWT
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // payload deve conter o usu_id
        const [usuario] = await db.query(
            'SELECT usu_id, usu_nome, usu_tipo FROM USUARIOS WHERE usu_id = ? AND usu_ativo = 1',
            [payload.usu_id]
        );

        if (usuario.length === 0) {
            return response.status(401).json({
                sucesso: false,
                mensagem: 'Usuário não autorizado ou inativo.'
            });
        }

        request.usuario = usuario[0];
        next();

    } catch (error) {
        return response.status(500).json({
            sucesso: false,
            mensagem: 'Erro na autenticação.',
            erro: error.message
        });
    }
};

const autorizar = (...tiposPermitidos) => {
    return (request, response, next) => {
        if (!tiposPermitidos.includes(request.usuario.usu_tipo)) {
            return response.status(403).json({
                sucesso: false,
                mensagem: 'Acesso negado. Permissões insuficientes.'
            });
        }
        next();
    };
};

module.exports = { autenticar, autorizar };
