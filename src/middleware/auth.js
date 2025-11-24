const db = require('../database/connection');
const jwt = require("jsonwebtoken");

const autenticar = async (request, response, next) => {
    try {
        let authHeader = request.headers.authorization;

        if (!authHeader) {
            return response.status(401).json({
                sucesso: false,
                mensagem: "Token de autenticação necessário."
            });
        }

        // Remove "Bearer "
        if (authHeader.startsWith("Bearer ")) {
            authHeader = authHeader.substring(7);
        }

        // Verifica se o token ainda está vazio
        if (!authHeader) {
            return response.status(401).json({
                sucesso: false,
                mensagem: "Token de autenticação inválido."
            });
        }

        // Decodifica/verifica o token JWT
        const payload = jwt.verify(authHeader, process.env.JWT_SECRET);

        if (!payload || !payload.usu_id) {
            return response.status(401).json({
                sucesso: false,
                mensagem: "Token inválido."
            });
        }

        // Verifica usuário no banco
        const [resultado] = await db.query(
            'SELECT usu_id, usu_nome, usu_tipo FROM USUARIOS WHERE usu_id = ? AND usu_ativo = 1',
            [payload.usu_id]
        );

        if (resultado.length === 0) {
            return response.status(401).json({
                sucesso: false,
                mensagem: 'Usuário não autorizado ou inativo.'
            });
        }

        // Salva o usuário autenticado na requisição
        request.usuario = resultado[0];

        next();

    } catch (error) {
        return response.status(401).json({
            sucesso: false,
            mensagem: 'Erro na autenticação.',
            erro: error.message
        });
    }
};

const autorizar = (...tiposPermitidos) => {
    return (request, response, next) => {
        if (!request.usuario || !tiposPermitidos.includes(request.usuario.usu_tipo)) {
            return response.status(403).json({
                sucesso: false,
                mensagem: 'Acesso negado. Permissões insuficientes.'
            });
        }
        next();
    };
};

module.exports = { autenticar, autorizar };