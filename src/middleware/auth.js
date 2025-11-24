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

        if (!authHeader) {
            return response.status(401).json({
                sucesso: false,
                mensagem: "Token de autenticação inválido."
            });
        }

        // CORREÇÃO: Verifica se é um JWT válido
        const payload = jwt.verify(authHeader, process.env.JWT_SECRET);

        if (!payload || !payload.usu_id) {
            return response.status(401).json({
                sucesso: false,
                mensagem: "Token inválido."
            });
        }

        // Verifica usuário no banco (opcional, mas recomendado para verificar se ainda está ativo)
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

        request.usuario = resultado[0];
        next();

    } catch (error) {
        // CORREÇÃO: Mensagem mais específica para diferentes tipos de erro JWT
        if (error.name === 'TokenExpiredError') {
            return response.status(401).json({
                sucesso: false,
                mensagem: 'Token expirado.'
            });
        } else if (error.name === 'JsonWebTokenError') {
            return response.status(401).json({
                sucesso: false,
                mensagem: 'Token inválido.'
            });
        }
        
        return response.status(401).json({
            sucesso: false,
            mensagem: 'Erro na autenticação.',
            erro: error.message
        });
    }
};

// CORREÇÃO: Adicionar a função autorizar que estava faltando
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