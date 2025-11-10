const express = require('express'); 
const router = express.Router(); 

const UsuariosController = require('../controllers/usuarios');
const CategoriaController = require('../controllers/categoria');
const AssuntosController = require('../controllers/assuntos');
const FAQController = require('../controllers/faq');
const NoticiasController = require('../controllers/noticias');
const SuporteController = require('../controllers/suporte');
const CompartilhamentoController = require('../controllers/compartilhamento');
const PersonagensController = require('../controllers/personagens');
const ArsenalController = require('../controllers/arsenal');
const MapasController = require('../controllers/mapas');

router.get('/usuarios', UsuariosController.listarUsuarios); 
router.post('/usuarios', UsuariosController.cadastrarUsuarios); 
router.patch('/usuarios/:id', UsuariosController.editarUsuarios); 
router.delete('/usuarios/:id', UsuariosController.apagarUsuarios); 
router.delete('/usuarios/del/:id', UsuariosController.ocultarUsuario);
router.get('/login', UsuariosController.login); 

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

router.get('/personagens', PersonagensController.listarPersonagens);
router.get('/personagens/:id', PersonagensController.listarPersonagemPorId);
router.post('/personagens', PersonagensController.cadastrarPersonagem);
router.put('/personagens/:id', PersonagensController.editarPersonagem);
router.delete('/personagens/:id', PersonagensController.apagarPersonagem);

router.get('/arsenal', ArsenalController.listarArsenal);
router.post('/arsenal', ArsenalController.cadastrarArsenal);
router.put('/arsenal/:id', ArsenalController.editarArsenal);
router.delete('/arsenal/:id', ArsenalController.apagarArsenal);

router.get('/mapas', MapasController.listarMapas);
router.post('/mapas', MapasController.cadastrarMapa);
router.put('/mapas/:id', MapasController.editarMapa);
router.delete('/mapas/:id', MapasController.apagarMapa);

router.get('/suporte', SuporteController.listarSuporte); 
router.post('/suporte', SuporteController.cadastrarSuporte); 
router.patch('/suporte/:id', SuporteController.editarSuporte); 
router.delete('/suporte/:id', SuporteController.apagarSuporte);

router.get('/compartilhamento', CompartilhamentoController.listarCompartilhamento); 
router.post('/compartilhamento', CompartilhamentoController.cadastrarCompartilhamento); 
router.patch('/compartilhamento/:id', CompartilhamentoController.editarCompartilhamento); 
router.delete('/compartilhamento/:id', CompartilhamentoController.apagarCompartilhamento);

module.exports = router;
