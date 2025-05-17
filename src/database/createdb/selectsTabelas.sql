SELECT usu_id, usu_nome, usu_email, usu_senha, usu_data_cadastro, usu_tipo FROM USUARIOS;
SELECT faq_id, usu_id, faq_pergunta, faq_resposta FROM FAQ;
SELECT not_id, usu_id, not_titulo, not_conteudo, not_imagem, not_data_publicacao FROM NOTICIAS;
SELECT comp_id, not_id, comp_plataforma, comp_data FROM COMPARTILHAMENTO;
SELECT cat_id, cat_nome FROM CATEGORIA;
SELECT inf_id, cat_id, usu_id, inf_titulo, inf_descricao, inf_imagem FROM INF_JOGO;
SELECT asst_id, asst_nome FROM ASSUNTOS;
SELECT sup_id, usu_id, asst_id, sup_mensagem, sup_status, sup_data_criacao, sup_email, sup_nome FROM SUPORTE;