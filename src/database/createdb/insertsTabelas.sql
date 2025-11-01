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
(1, 0, 'Kael, o Guardião', 'kael_guardiao.jpg', 'Kael em armadura dourada', 'Um guerreiro habilidoso que protege as terras sagradas com sua armadura encantada. Mestre em combate corpo a corpo.', 'A luz sempre prevalecerá sobre as trevas!'),
(1, 1, 'Sir Alistair, o Cavaleiro', 'alistair_cavaleiro.jpg', 'Sir Alistair com espada longa', 'Cavaleiro da Ordem Real, jurado a proteger os inocentes. Sua lealdade é tão forte quanto sua espada.', 'Pela honra e pela justiça!'),
(1, 2, 'Seraphina, a Anja', 'seraphina_anja.jpg', 'Seraphina com asas brancas', 'Ser celestial enviada para guiar os heróis. Suas asas brilham com a luz divina.', 'A esperança nunca morre, apenas renasce.'),
(1, 3, 'Morlock, o Corrompido', 'morlock_corrompido.jpg', 'Morlock com armadura negra', 'Antigo herói consumido pela escuridão. Agora lidera as forças do mal com poder devastador.', 'A escuridão consome tudo!'),
(1, 0, 'Lena, a Guardiã da Floresta', 'lena_guardiã.jpg', 'Lena com arco de madeira', 'Protetora das florestas antigas, usa magia natural e arco para defender seu lar.', 'A natureza sempre encontra um caminho.'),
(1, 1, 'Dante, o Cavaleiro das Sombras', 'dante_cavaleiro.jpg', 'Dante com armadura prateada', 'Cavaleiro que abandonou sua ordem para seguir seu próprio código de honra nas sombras.', 'Às vezes, a justiça precisa de sombras.');


-- Inserts para a tabela ARSENAL
INSERT INTO ARSENAL (usu_id, ars_tipo, ars_nome, ars_src, ars_alt, ars_dano, ars_raridade, ars_municao, ars_alcance, ars_taxa_disparo, ars_taxa_acerto) VALUES
(1, 0, 'Espada Flamejante', 'espada_flamejante.jpg', 'Espada com lâmina em chamas', 85, 'Lendária', NULL, 2, NULL, 95.0),
(1, 0, 'Pistola de Plasma', 'pistola_plasma.jpg', 'Pistola futurista azul', 45, 'Rara', 12, 15, 2.5, 88.0),
(1, 1, 'Adagas Sombrias', 'adagas_sombrias.jpg', 'Par de adagas negras', 60, 'Épica', NULL, 1, NULL, 98.0),
(1, 2, 'Rifle de Precisão Celestial', 'rifle_celestial.jpg', 'Rifle longo com detalhes dourados', 120, 'Lendária', 5, 50, 0.8, 99.5),
(1, 0, 'Machado do Deserto', 'machado_deserto.jpg', 'Machado de batalha enferrujado', 75, 'Comum', NULL, 3, NULL, 85.0),
(1, 2, 'Arco Sombrio', 'arco_sombrio.jpg', 'Arco negro com corda prateada', 65, 'Rara', 20, 30, 1.2, 92.0),
(1, 1, 'Lâminas Gêmeas do Caos', 'laminas_caos.jpg', 'Par de lâminas curvas energéticas', 55, 'Épica', NULL, 2, NULL, 96.0),
(1, 2, 'Besta Automática', 'besta_automatica.jpg', 'Besta moderna com carregador', 70, 'Rara', 8, 25, 1.8, 90.0);


-- Inserts para a tabela MAPAS
INSERT INTO MAPAS (usu_id, mapa_src, mapa_alt, mapa_nome, mapa_descricao) VALUES
(1, 'vale_sombrio.jpg', 'Floresta densa com névoa', 'Vale Sombrio', 'Uma floresta densa coberta por névoa perpétua, lar de criaturas misteriosas e ruínas antigas. A visibilidade é limitada e sons estranhos ecoam entre as árvores.'),
(1, 'fortaleza_aco.jpg', 'Fortaleza metálica futurista', 'Fortaleza de Aço', 'Uma cidade fortificada repleta de armadilhas e inimigos mecânicos. Torres de vigilância e paredes imponentes protegem segredos tecnológicos valiosos.'),
(1, 'deserto_perdicao.jpg', 'Deserto vasto com dunas', 'Deserto da Perdição', 'Um deserto vasto onde tempestades de areia escondem segredos antigos. Oásis ocultos e ruínas de civilizações perdidas aguardam para serem descobertos.'),
(1, 'montanhas_gelidas.jpg', 'Montanhas cobertas de neve', 'Montanhas Gélidas', 'Região congelada habitada por bestas lendárias e tribos resistentes ao frio. Ventos cortantes e cavernas de gelo escondem tesouros ancestrais.'),
(1, 'ruinas_abandonadas.jpg', 'Ruínas de templo antigo', 'Ruínas Abandonadas', 'Restos de uma civilização antiga, cheia de armadilhas e enigmas. Hieróglifos misteriosos contam histórias de um passado glorioso.'),
(1, 'caverna_almas.jpg', 'Caverna com cristais brilhantes', 'Caverna das Almas', 'Uma caverna profunda onde ecoam os sussurros dos antigos guerreiros. Cristais luminosos iluminam passagens secretas e câmaras ocultas.');


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
