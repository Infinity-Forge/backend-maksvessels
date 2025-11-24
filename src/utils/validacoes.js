const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const validarTipoPersonagem = (tipo) => {
    return [0, 1, 2, 3].includes(parseInt(tipo));
};

const validarTipoArma = (tipo) => {
    return [0, 1, 2].includes(parseInt(tipo));
};

const validarRaridade = (raridade) => {
    const raridadesValidas = ['Comum', 'Incomum', 'Raro', 'Épico', 'Lendário'];
    return raridadesValidas.includes(raridade);
};

const validarStatusSuporte = (status) => {
    const statusValidos = ['Aberto', 'Em andamento', 'Resolvido', 'Fechado'];
    return statusValidos.includes(status);
};

const validarTipoUsuario = (tipo) => {
    const tiposValidos = ['admin', 'usuario', 'moderador'];
    return tiposValidos.includes(tipo);
};

module.exports = {
    validarEmail,
    validarTipoPersonagem,
    validarTipoArma,
    validarRaridade,
    validarStatusSuporte,
    validarTipoUsuario
};