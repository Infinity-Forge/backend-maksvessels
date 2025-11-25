const fse = require('fs-extra');
const path = require('path');
const { URL } = require('url');

/**
 * Caminho físico para a pasta 'public'.
 */
const PUBLIC_ROOT_PATH = path.join(process.cwd(), 'public');

/**
 * Lê a URL base da API a partir das variáveis de ambiente.
 * Fornece um valor padrão caso a variável não esteja definida.
 */
const API_URL = process.env.API_BASE_URL || 'http://localhost:3333';

/**
 * Gera uma URL pública e COMPLETA para um recurso (imagem, ícone, etc.)
 * @param {string} nomeArquivo - Nome do arquivo de imagem
 * @param {string} pasta - Pasta onde a imagem está (ex: 'noticias', 'personagens')
 * @param {string} arquivoPadrao - Nome do arquivo padrão se a imagem não existir
 * @returns {string} URL completa formatada
 */
function gerarUrl(nomeArquivo, pasta, arquivoPadrao = 'sem.jpg') {
    const arquivoVerificar = nomeArquivo || arquivoPadrao;
    const caminhoFisico = path.join(PUBLIC_ROOT_PATH, pasta, arquivoVerificar);

    let caminhoRelativo;

    // Se um nome de arquivo foi fornecido e ele existe...
    if (nomeArquivo && fse.existsSync(caminhoFisico)) {
        // ...usa o caminho para esse arquivo
        caminhoRelativo = path.join('/public', pasta, nomeArquivo);
    } else {
        // ...caso contrário, usa o caminho do arquivo padrão
        caminhoRelativo = path.join('/public', pasta, arquivoPadrao);
    }

    // Garante que o caminho relativo use barras '/'
    const caminhoRelativoFormatado = caminhoRelativo.replace(/\\/g, '/');

    // Constrói a URL completa de forma segura, evitando barras duplas (//)
    const urlCompleta = new URL(caminhoRelativoFormatado, API_URL);

    return urlCompleta.href;
}

module.exports = { gerarUrl };