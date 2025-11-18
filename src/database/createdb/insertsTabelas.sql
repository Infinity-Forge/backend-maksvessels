-- Inserts para a tabela USUARIOS
INSERT INTO USUARIOS (usu_nome, usu_email, usu_senha, usu_data_cadastro, usu_tipo, usu_ativo) VALUES
-- Administradores
('Carlos Silva', 'carlos.silva@email.com', 'senha123', NOW(), 'Administrador', 1),
('Ricardo Mendes', 'ricardo.mendes@email.com', 'senha654', NOW(), 'Administrador', 1),
('Gustavo Ferreira', 'gustavo.ferreira@email.com', 'senha333', NOW(), 'Administrador', 1),
('Bruno Cardoso', 'bruno.cardoso@email.com', 'senha777', NOW(), 'Administrador', 1),
('Rafael Almeida', 'rafael.almeida@email.com', 'senha202', NOW(), 'Administrador', 1),
('Henrique Vasconcelos', 'henrique.vasconcelos@email.com', 'senha808', NOW(), 'Administrador', 1),
('André Maciel', 'andre.maciel@email.com', 'senha030', NOW(), 'Administrador', 1),

-- Moderadores
('João Souza', 'joao.souza@email.com', 'senha789', NOW(), 'Moderador', 1),
('Eduardo Alves', 'eduardo.alves@email.com', 'senha111', NOW(), 'Moderador', 1),
('Thiago Ribeiro', 'thiago.ribeiro@email.com', 'senha555', NOW(), 'Moderador', 1),
('Juliana Mendes', 'juliana.mendes@email.com', 'senha101', NOW(), 'Moderador', 1),
('Leonardo Campos', 'leonardo.campos@email.com', 'senha606', NOW(), 'Moderador', 1),
('Rodrigo Nascimento', 'rodrigo.nascimento@email.com', 'senha010', NOW(), 'Moderador', 1);


-- Inserts para a tabela FAQ
INSERT INTO FAQ (usu_id, faq_pergunta, faq_resposta) VALUES
(1, 'Como faço para criar uma conta no jogo?', 'Não temos conta para o jogo apenas para o nosso site.'),
(2, 'O jogo é gratuito?', 'Sim, o jogo é totalmente gratuito.'),
(3, 'Meu jogo está travando, o que posso fazer?', 'Certifique-se de que seu dispositivo atende aos requisitos mínimos e tente fechar outros aplicativos em segundo plano.'),
(4, 'Quais são os requisitos mínimos para rodar o jogo?', 'Os requisitos mínimos variam de acordo com a plataforma. Consulte a página de suporte para mais detalhes.'),
(5, 'Como posso recuperar minha conta se esqueci a senha?', 'Na tela de login, clique em "Esqueci minha senha" e siga as instruções para redefini-la.'),
(6, 'O jogo possui suporte para controle?', 'Não, atualmente o jogo é compativel apenas para teclado e mouse, mas pretendemos adicionar suporte para controle.'),
(7, 'Como posso mudar o idioma do jogo?', 'Não tem como mudar o idioma no nosso jogo, temos apenas a lingua portuguesa.'),
(8, 'Existe modo multiplayer?', 'Não, o jogo é modo historia e offline.'),
(9, 'O progresso do jogo é salvo automaticamente?', 'Sim, o jogo salva seu progresso automaticamente sempre que você completa uma fase ou realiza uma ação importante.'),
(10, 'O que fazer se eu encontrar um bug no jogo?', 'Você pode relatar bugs pelo e-mail oficial da equipe de desenvolvimento.'),
(11, 'Como posso entrar em contato com o suporte técnico?', 'Você pode entrar em contato pelo nosso e-mail de suporte ou pelo chat disponível no site.'),
(12, 'Posso transferir minha conta para outra plataforma?', 'Não, por enquanto não temos suporte para outras plataformas.'),
(13, 'O jogo tem microtransações?', 'Não, tudo no jogo é gratuito e depende do jogador para conseguir.');


-- Inserts para a tabela NOTICIAS
INSERT INTO NOTICIAS (usu_id, not_titulo, not_conteudo, not_imagem) VALUES
(1, 'Nova atualização disponível!', 'A versão 1.2 do jogo já está disponível para download. Confira as novidades e correções de bugs.', 'atualizacao_v1_2.jpg'),
(2, 'Dicas para avançar na fase 5', 'Confira algumas dicas para superar os desafios da fase 5 e desbloquear o personagem secreto.', 'dicas_fase_5.jpg'),
(3, 'Evento especial de Natal', 'Participe do nosso evento de Natal e ganhe recompensas exclusivas! O evento vai até o dia 25/12.', 'evento_natal.jpg'),
(4, 'Conheça os personagens do jogo', 'Descubra a história e as habilidades dos personagens principais do jogo.', 'personagens_jogo.jpg'),
(5, 'Correção de bugs críticos', 'A versão 1.1.1 corrige problemas de travamento e salvamento de progresso. Baixe agora!', 'correcao_bugs.jpg'),
(6, 'Sugestões da comunidade', 'Confira as sugestões enviadas pelos jogadores e saiba o que estamos planejando para o futuro.', 'sugestoes_comunidade.jpg'),
(7, 'Novo trailer do jogo', 'Assista ao novo trailer do jogo e veja cenas inéditas da história.', 'trailer_jogo.jpg'),
(8, 'Requisitos mínimos atualizados', 'Confira os novos requisitos mínimos para rodar o jogo com melhor desempenho.', 'requisitos_jogo.jpg'),
(9, 'Concurso de cosplay do jogo', 'Participe do nosso concurso de cosplay e concorra a prêmios incríveis!', 'concurso_cosplay.jpg'),
(10, 'Planejamento para 2024', 'Saiba o que a equipe de desenvolvimento está preparando para o próximo ano.', 'planejamento_2024.jpg');


-- Inserts para a tabela COMPARTILHAMENTO
INSERT INTO COMPARTILHAMENTO (not_id, comp_plataforma) VALUES
(1, 'Facebook'),
(1, 'Twitter'),
(2, 'Instagram'),
(3, 'Facebook'),
(3, 'Twitter'),
(3, 'Instagram'),
(4, 'Twitter'),
(5, 'Facebook'),
(6, 'Instagram'),
(7, 'Facebook'),
(7, 'Twitter'),
(8, 'Twitter'),
(9, 'Instagram'),
(10, 'Facebook'),
(10, 'Twitter'),
(10, 'Instagram');


-- Inserts para a tabela CATEGORIA
INSERT INTO CATEGORIA (cat_nome) VALUES
('Armas'),
('Personagens'),
('Mapas');


-- Inserts para a tabela PERSONAGENS
INSERT INTO PERSONAGENS (usu_id, pers_tipo, pers_nome, pers_src, pers_alt, pers_descricao, pers_frase) VALUES
(1, 0, 'Rato', '/rato.jpg', 'Imagem do Rato', 'Lorem ipsum dolor sit amet.', 'Sempre alerta!'),
(1, 0, 'Urso', '/urso.jpg', 'Imagem do Urso', 'Lorem ipsum dolor sit amet.', 'Força e coragem.'),
(1, 0, 'Gata', '/gata.jpg', 'Imagem da Gata', 'Lorem ipsum dolor sit amet.', 'Vamos juntos!'),
(1, 0, 'Peixe Boi', '/peixeBoi.jpg', 'Imagem do Peixe Boi', 'Lorem ipsum dolor sit amet.', 'Sempre lutando!'),
(1, 1, 'Peste', '/peste.jpg', 'Imagem do Cavaleiro da Peste', 'Lorem ipsum dolor sit amet.', 'Cuidado com a peste!'),
(1, 1, 'Morte', '/morte.jpg', 'Imagem do Cavaleiro da Morte', 'Lorem ipsum dolor sit amet.', 'A morte é certa.'),
(1, 1, 'Guerra', '/guerra.jpg', 'Imagem de um Cavaleiro', 'Lorem ipsum dolor sit amet.', 'Lutando sempre!'),
(1, 1, 'Fome', '/fome.jpg', 'Imagem do Cavaleiro da Fome', 'Lorem ipsum dolor sit amet.', 'A fome não espera.'),
(1, 2, 'Anjos', '/anjos.jpg', 'Imagem dos Anjos', 'Lorem ipsum dolor sit amet.', 'Sempre protegendo.'),
(1, 2, 'Arcanjos', '/arcanjos.jpg', 'Imagem dos Arcanjos', 'Lorem ipsum dolor sit amet.', 'Mensageiros divinos.'),
(1, 2, 'Querubins', '/querubins.jpg', 'Imagem dos Querubins', 'Lorem ipsum dolor sit amet.', 'Pequenos protetores.'),
(1, 2, 'Serafins', '/serafins.jpg', 'Imagem dos Serafins', 'Lorem ipsum dolor sit amet.', 'Chama sagrada.'),
(1, 2, 'Anjo Miguel', '/anjoMiguel.jpg', 'Imagem do Anjo Miguel', 'Lorem ipsum dolor sit amet.', 'O guerreiro divino.'),
(1, 2, 'Anjo Gabriel', '/anjoGabriel.jpg', 'Imagem do Anjo Gabriel', 'Lorem ipsum dolor sit amet.', 'O mensageiro sagrado.'),
(1, 3, 'Luffy', '/luffy.jpg', 'Imagem de um Inimigo', 'Lorem ipsum dolor sit amet.', 'Inimigo!'),
(1, 3, 'Luffy', '/luffy.jpg', 'Imagem de um Inimigo', 'Lorem ipsum dolor sit amet.', 'Perigo à frente!'),
(1, 3, 'Luffy', '/luffy.jpg', 'Imagem de um Inimigo', 'Lorem ipsum dolor sit amet.', 'Cuidado!'),
(1, 3, 'Luffy', '/luffy.jpg', 'Imagem de um Inimigo', 'Lorem ipsum dolor sit amet.', 'Atenção!'),
(1, 3, 'Luffy', '/luffy.jpg', 'Imagem de um Inimigo', 'Lorem ipsum dolor sit amet.', 'Ação rápida!'),
(1, 3, 'Luffy', '/luffy.jpg', 'Imagem de um Inimigo', 'Lorem ipsum dolor sit amet.', 'Perigo!'),
(1, 3, 'Luffy', '/luffy.jpg', 'Imagem de um Inimigo', 'Lorem ipsum dolor sit amet.', 'Fique atento!'),
(1, 3, 'Luffy', '/luffy.jpg', 'Imagem de um Inimigo', 'Lorem ipsum dolor sit amet.', 'Alerta!'),
(1, 3, 'Luffy', '/luffy.jpg', 'Imagem de um Inimigo', 'Lorem ipsum dolor sit amet.', 'Perigo eminente!'),
(1, 3, 'Luffy', '/luffy.jpg', 'Imagem de um Inimigo', 'Lorem ipsum dolor sit amet.', 'Atenção máxima!'),
(1, 3, 'Luffy', '/luffy.jpg', 'Imagem de um Inimigo', 'Lorem ipsum dolor sit amet.', 'Perigo!'),
(1, 3, 'Luffy', '/luffy.jpg', 'Imagem de um Inimigo', 'Lorem ipsum dolor sit amet.', 'Cuidado!'),
(1, 3, 'Luffy', '/luffy.jpg', 'Imagem de um Inimigo', 'Lorem ipsum dolor sit amet.', 'Fique alerta!');


-- Inserts para a tabela ARSENAL
INSERT INTO ARSENAL (usu_id, ars_tipo, ars_nome, ars_src, ars_alt, ars_dano, ars_raridade, ars_municao, ars_alcance, ars_taxa_disparo, ars_taxa_acerto) VALUES
(1, 0, 'Pistola', '/arma.png', 'Pistola', 18, 'Comum', 9, 50, 450, 48),
(1, 0, 'Pistola', '/arma.png', 'Pistola', 20, 'Comum', 9, 55, 420, 50),
(1, 0, 'Pistola', '/arma.png', 'Pistola', 24, 'Incomum', 9, 60, 500, 56),
(1, 0, 'Pistola', '/arma.png', 'Pistola', 26, 'Raro', 9, 65, 520, 62),
(1, 0, 'Pistola', '/arma.png', 'Pistola', 22, 'Incomum', 9, 58, 470, 54),
(1, 0, 'Pistola', '/arma.png', 'Pistola', 28, 'Raro', 9, 68, 540, 64),
(1, 0, 'Pistola', '/arma.png', 'Pistola', 30, 'Épico', 9, 70, 560, 68),
(1, 0, 'Pistola', '/arma.png', 'Pistola', 16, 'Comum', 9, 45, 400, 45),
(1, 1, 'Faca', '/arma.png', 'Faca', 48, 'Comum', NULL, 1.5, 90, 85),
(1, 1, 'Faca', '/arma.png', 'Faca', 55, 'Incomum', NULL, 1.5, 80, 88),
(1, 1, 'Faca', '/arma.png', 'Faca', 40, 'Comum', NULL, 1.2, 100, 82),
(1, 1, 'Faca', '/arma.png', 'Faca', 60, 'Raro', NULL, 1.8, 75, 90),
(1, 1, 'Faca', '/arma.png', 'Faca', 46, 'Comum', NULL, 1.3, 95, 83),
(1, 1, 'Faca', '/arma.png', 'Faca', 52, 'Incomum', NULL, 1.6, 85, 86),
(1, 1, 'Faca', '/arma.png', 'Faca', 58, 'Raro', NULL, 1.7, 78, 89),
(1, 1, 'Faca', '/arma.png', 'Faca', 42, 'Comum', NULL, 1.4, 98, 81),
(1, 2, 'Riffle', '/arma.png', 'Riffle', 62, 'Comum', 556, 600, 600, 54),
(1, 2, 'Riffle', '/arma.png', 'Riffle', 74, 'Incomum', 556, 650, 650, 58),
(1, 2, 'Riffle', '/arma.png', 'Riffle', 88, 'Raro', 762, 800, 520, 66),
(1, 2, 'Riffle', '/arma.png', 'Riffle', 70, 'Incomum', 556, 700, 620, 60),
(1, 2, 'Riffle', '/arma.png', 'Riffle', 95, 'Épico', 762, 850, 480, 72),
(1, 2, 'Riffle', '/arma.png', 'Riffle', 66, 'Comum', 556, 620, 610, 55),
(1, 2, 'Riffle', '/arma.png', 'Riffle', 82, 'Raro', 762, 780, 540, 64),
(1, 2, 'Riffle', '/arma.png', 'Riffle', 58, 'Comum', 556, 590, 630, 52);


-- Inserts para a tabela MAPAS
INSERT INTO MAPAS (usu_id, mapa_src, mapa_alt, mapa_nome, mapa_descricao) VALUES
(1, '/mapa1.png', 'Mapa Principal', 'Mapa Principal', 'Este é o mapa principal do jogo'),
(1, '/mapa2.png', 'Mapa Principal', 'Mapa Principal', 'Este é o mapa principal do jogo.'),
(1, '/mapa3.png', 'Mapa Principal', 'Mapa Principal', 'Este é o mapa principal do jogo.'),
(1, '/mapa4.png', 'Mapa Principal', 'Mapa Principal', 'Este é o mapa principal do jogo.'),
(1, '/mapa5.png', 'Mapa Principal', 'Mapa Principal', 'Este é o mapa principal do jogo.');


-- Inserts para a tabela ASSUNTOS
INSERT INTO ASSUNTOS (asst_nome) VALUES
('Problemas técnicos'),
('Dúvidas sobre progresso no jogo'),
('Sugestões de melhorias'),
('Problemas com salvamento de progresso'),
('Reportar bugs'),
('Dúvidas sobre personagens'),
('Problemas com instalação'),
('Dúvidas sobre requisitos do sistema'),
('Sugestões de novos personagens'),
('Dúvidas sobre história do jogo'),
('Problemas com controles (teclado/mouse)'),
('Dúvidas sobre desbloqueio de conteúdo'),
('Elogios ao jogo'),
('Dúvidas sobre atualizações futuras'),
('Problemas com desempenho (lag/travamentos)'),
('Dúvidas sobre compatibilidade'),
('Sugestões de novos recursos'),
('Problemas com áudio'),
('Dúvidas sobre finais alternativos'),
('Outros');


-- Inserts para a tabela SUPORTE
INSERT INTO SUPORTE (usu_id, asst_id, sup_mensagem, sup_status, sup_email, sup_nome) VALUES
(1, 1, 'O jogo não abre após a instalação. Aparece uma mensagem de erro relacionada ao DirectX.', 'Aberto', 'jogador1@example.com', 'João Silva'),
(2, 2, 'Como posso avançar na fase 5? Estou preso há horas.', 'Em andamento', 'jogador2@example.com', 'Maria Oliveira'),
(3, 3, 'Sugiro adicionar mais diálogos para o personagem principal. Ele parece muito mudo.', 'Aberto', 'jogador3@example.com', 'Carlos Souza'),
(4, 4, 'Meu progresso não foi salvo após fechar o jogo. Perdi horas de jogo.', 'Fechado', 'jogador4@example.com', 'Ana Costa'),
(5, 5, 'Encontrei um bug na fase 3 onde o personagem fica preso em uma parede.', 'Aberto', 'jogador5@example.com', 'Pedro Rocha'),
(6, 6, 'Como desbloqueio o personagem secreto que vi em um vídeo?', 'Em andamento', 'jogador6@example.com', 'Luiza Mendes'),
(7, 7, 'O instalador do jogo trava no meio da instalação. O que fazer?', 'Aberto', 'jogador7@example.com', 'Rafael Lima'),
(8, 8, 'Meu computador atende aos requisitos mínimos, mas o jogo está muito lento.', 'Fechado', 'jogador8@example.com', 'Fernanda Alves'),
(9, 9, 'Sugiro adicionar um novo personagem com habilidades de combate a distância.', 'Aberto', 'jogador9@example.com', 'Lucas Pereira'),
(10, 10, 'A história do jogo é incrível! Parabéns à equipe de desenvolvimento.', 'Fechado', 'jogador10@example.com', 'Mariana Santos'),
(11, 11, 'Os controles do jogo estão muito sensíveis. Há como ajustar a sensibilidade?', 'Aberto', 'jogador11@example.com', 'Gustavo Oliveira'),
(12, 12, 'Como desbloqueio a arma especial que vi em um vídeo?', 'Em andamento', 'jogador12@example.com', 'Camila Rocha'),
(13, 13, 'O jogo é incrível! Vocês planejam lançar uma sequência?', 'Fechado', 'jogador13@example.com', 'Bruno Costa');
