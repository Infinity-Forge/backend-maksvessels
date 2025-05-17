const express = require('express'); 
const router = express.Router(); 

const UsuariosController = require('../controllers/usuarios');
const CategoriaController = require('../controllers/categoria');
const AssuntosController = require('../controllers/assuntos');
const FAQController = require('../controllers/faq');
const NoticiasController = require('../controllers/noticias');
const infsJogoController = require('../controllers/infsJogo');
const SuporteController = require('../controllers/suporte');
const CompartilhamentoController = require('../controllers/Compartilhamento');

router.get('/usuarios', UsuariosController.listarUsuarios); 
router.post('/usuarios', UsuariosController.cadastrarUsuarios); 
router.patch('/usuarios/:id', UsuariosController.editarUsuarios); 
router.delete('/usuarios/:id', UsuariosController.apagarUsuarios); 

router.get('/categoria', CategoriaController.listarCategoria); 
router.post('/categoria', CategoriaController.cadastrarCategoria); 
router.patch('/categoria/:id', CategoriaController.editarCategoria); 
router.delete('/categoria/:id', CategoriaController.apagarCategoria);

router.get('/Assuntos', AssuntosController.listarAssuntos); 
router.post('/Assuntos', AssuntosController.cadastrarAssuntos); 
router.patch('/Assuntos/:id', AssuntosController.editarAssuntos); 
router.delete('/Assuntos/:id', AssuntosController.apagarAssuntos);

router.get('/faq', FAQController.listarFAQ); 
router.post('/faq', FAQController.adicionarFAQ); 
router.patch('/faq/:id', FAQController.editarFAQ); 
router.delete('/faq/:id', FAQController.removerFAQ);

router.get('/noticias', NoticiasController.listarNoticias); 
router.post('/noticias', NoticiasController.cadastrarNoticias); 
router.patch('/noticias/:id', NoticiasController.editarNoticias); 
router.delete('/noticias/:id', NoticiasController.apagarNoticias);

router.get('/infsJogo', infsJogoController.listarInfsJogo); 
router.post('/infsJogo', infsJogoController.cadastrarInfsJogo); 
router.patch('/infsJogo/:id', infsJogoController.editarInfsJogo); 
router.delete('/infsJogo/:id', infsJogoController.apagarInfsJogo);

router.get('/suporte', SuporteController.listarSuporte); 
router.post('/suporte', SuporteController.cadastrarSuporte); 
router.patch('/suporte/:id', SuporteController.editarSuporte); 
router.delete('/suporte/:id', SuporteController.apagarSuporte);

router.get('/compartilhamento', CompartilhamentoController.listarCompartilhamento); 
router.post('/compartilhamento', CompartilhamentoController.cadastrarCompartilhamento); 
router.patch('/compartilhamento/:id', CompartilhamentoController.editarCompartilhamento); 
router.delete('/compartilhamento/:id', CompartilhamentoController.apagarCompartilhamento);

module.exports = router;