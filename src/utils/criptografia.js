const bcrypt = require('bcrypt');

const criptografarSenha = async (senha) => {
    const saltRounds = 10;
    return await bcrypt.hash(senha, saltRounds);
};

const verificarSenha = async (senha, hash) => {
    return await bcrypt.compare(senha, hash);
};

module.exports = { criptografarSenha, verificarSenha };