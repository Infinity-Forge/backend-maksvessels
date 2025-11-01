-- Criação das tabelas
CREATE TABLE IF NOT EXISTS USUARIOS (
    usu_id INT PRIMARY KEY AUTO_INCREMENT,
    usu_nome VARCHAR(100) NOT NULL,
    usu_email VARCHAR(150) NOT NULL UNIQUE,
    usu_senha VARCHAR(255) NOT NULL,
    usu_data_cadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    usu_tipo VARCHAR(50) NOT NULL,
    usu_ativo BOOLEAN NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS CATEGORIA (
    cat_id INT PRIMARY KEY AUTO_INCREMENT,
    cat_nome VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS ASSUNTOS (
    asst_id INT PRIMARY KEY AUTO_INCREMENT,
    asst_nome VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS FAQ (
    faq_id INT PRIMARY KEY AUTO_INCREMENT,
    usu_id INT NOT NULL,
    faq_pergunta VARCHAR(255) NOT NULL,
    faq_resposta VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS NOTICIAS (
    not_id INT PRIMARY KEY AUTO_INCREMENT,
    usu_id INT NOT NULL,
    not_titulo VARCHAR(50) NOT NULL,
    not_conteudo VARCHAR(255) NOT NULL,
    not_imagem VARCHAR(255),
    not_data_publicacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- NOVAS TABELAS (substituindo INF_JOGO)
CREATE TABLE IF NOT EXISTS PERSONAGENS (
    pers_id INT PRIMARY KEY AUTO_INCREMENT,
    usu_id INT NOT NULL,
    pers_tipo INT NOT NULL, -- 0 = guardião, 1 = cavaleiro, 2 = anjo, 3 = inimigo
    pers_nome VARCHAR(100) NOT NULL,
    pers_src VARCHAR(255) NOT NULL,
    pers_alt VARCHAR(100),
    pers_descricao TEXT,
    pers_frase VARCHAR(255),
    pers_data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usu_id) REFERENCES USUARIOS(usu_id)
);

CREATE TABLE IF NOT EXISTS ARSENAL (
    ars_id INT PRIMARY KEY AUTO_INCREMENT,
    usu_id INT NOT NULL,
    ars_tipo INT NOT NULL, -- 0 = pistola, 1 = faca, 2 = rifle
    ars_nome VARCHAR(100) NOT NULL,
    ars_src VARCHAR(255) NOT NULL,
    ars_alt VARCHAR(100),
    ars_dano INT,
    ars_raridade VARCHAR(50),
    ars_municao INT,
    ars_alcance INT,
    ars_taxa_disparo DECIMAL(5,2),
    ars_taxa_acerto DECIMAL(5,2),
    ars_data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usu_id) REFERENCES USUARIOS(usu_id)
);

CREATE TABLE IF NOT EXISTS MAPAS (
    mapa_id INT PRIMARY KEY AUTO_INCREMENT,
    usu_id INT NOT NULL,
    mapa_src VARCHAR(255) NOT NULL,
    mapa_alt VARCHAR(100),
    mapa_nome VARCHAR(100) NOT NULL,
    mapa_descricao TEXT,
    mapa_data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usu_id) REFERENCES USUARIOS(usu_id)
);

CREATE TABLE IF NOT EXISTS SUPORTE (
    sup_id INT PRIMARY KEY AUTO_INCREMENT,
    usu_id INT NOT NULL,
    asst_id INT NOT NULL,
    sup_mensagem VARCHAR(500) NOT NULL,
    sup_status VARCHAR(50) NOT NULL,
    sup_data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    sup_email VARCHAR(150) NOT NULL,
    sup_nome VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS COMPARTILHAMENTO (
    comp_id INT PRIMARY KEY AUTO_INCREMENT,
    not_id INT NOT NULL,
    comp_plataforma VARCHAR(100) NOT NULL,
    comp_data DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
