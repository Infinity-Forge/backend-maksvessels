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

const { autenticar, autorizar } = require('../middleware/auth');
const uploadImage = require('../middleware/uploadHelper');

const uploadNoticias = uploadImage('noticias');
const uploadPersonagens = uploadImage('personagens');
const uploadArsenal = uploadImage('arsenal');
const uploadMapas = uploadImage('mapas');

// Rotas públicas
router.post('/login', UsuariosController.login); 
router.post('/usuarios', UsuariosController.cadastrarUsuarios);

// Rotas protegidas
router.get('/usuarios', autenticar, UsuariosController.listarUsuarios); 
router.patch('/usuarios/:id', autenticar, UsuariosController.editarUsuarios); 
router.delete('/usuarios/:id', autenticar, autorizar('admin'), UsuariosController.apagarUsuarios); 
router.delete('/usuarios/del/:id', autenticar, autorizar('admin'), UsuariosController.ocultarUsuario);

// Categorias (apenas admin)
router.get('/categoria', CategoriaController.listarCategoria); 
router.post('/categoria', autenticar, autorizar('admin'), CategoriaController.cadastrarCategoria); 
router.patch('/categoria/:id', autenticar, autorizar('admin'), CategoriaController.editarCategoria); 
router.delete('/categoria/:id', autenticar, autorizar('admin'), CategoriaController.apagarCategoria);

// Assuntos (apenas admin)
router.get('/Assuntos', AssuntosController.listarAssunto); 
router.post('/Assuntos', autenticar, autorizar('admin'), AssuntosController.cadastrarAssunto); 
router.patch('/Assuntos/:id', autenticar, autorizar('admin'), AssuntosController.editarAssunto); 
router.delete('/Assuntos/:id', autenticar, autorizar('admin'), AssuntosController.apagarAssunto);

// FAQ (admin e moderador podem editar)
router.get('/faq', FAQController.listarFAQ); 
router.post('/faq', autenticar, autorizar('admin', 'moderador'), FAQController.adicionarFAQ); 
router.patch('/faq/:id', autenticar, autorizar('admin', 'moderador'), FAQController.editarFAQ); 
router.delete('/faq/:id', autenticar, autorizar('admin', 'moderador'), FAQController.removerFAQ);

// Notícias (autenticados)
router.get('/noticias', NoticiasController.listarNoticias); 
router.post('/noticias', autenticar, uploadNoticias.single('imagem'), NoticiasController.cadastrarNoticias);
router.patch('/noticias/:id', autenticar, uploadNoticias.single('imagem'), NoticiasController.editarNoticias);
router.delete('/noticias/:id', autenticar, NoticiasController.apagarNoticias);

// Personagens (autenticados)
router.get('/personagens', PersonagensController.listarPersonagens);
router.get('/personagens/:id', PersonagensController.listarPersonagemPorId);
router.post('/personagens', autenticar, uploadPersonagens.single('imagem'), PersonagensController.cadastrarPersonagem);
router.put('/personagens/:id', autenticar, uploadPersonagens.single('imagem'), PersonagensController.editarPersonagem);
router.delete('/personagens/:id', autenticar, PersonagensController.apagarPersonagem);

// Arsenal (autenticados)
router.get('/arsenal', ArsenalController.listarArsenal);
router.get('/arsenal/:id', ArsenalController.listarArmaPorId); // ⬅️ ADICIONE ESTA LINHA
router.post('/arsenal', autenticar, uploadArsenal.single('imagem'), ArsenalController.cadastrarArsenal);
router.put('/arsenal/:id', autenticar, uploadArsenal.single('imagem'), ArsenalController.editarArsenal);
router.delete('/arsenal/:id', autenticar, ArsenalController.apagarArsenal);

// Mapas (autenticados)
router.get('/mapas', MapasController.listarMapas);
router.get('/mapas/:id', MapasController.listarMapaPorId); // ⬅️ ADICIONE ESTA LINHA
router.post('/mapas', autenticar, uploadMapas.single('imagem'), MapasController.cadastrarMapa);
router.put('/mapas/:id', autenticar, uploadMapas.single('imagem'), MapasController.editarMapa);
router.delete('/mapas/:id', autenticar, MapasController.apagarMapa);

// Suporte (público para criar, autenticado para listar/editar)
router.get('/suporte', autenticar, SuporteController.listarSuporte); 
router.post('/suporte', SuporteController.cadastrarSuporte); 
router.patch('/suporte/:id', autenticar, SuporteController.editarSuporte); 
router.delete('/suporte/:id', autenticar, autorizar('admin', 'moderador'), SuporteController.apagarSuporte);

// Compartilhamento (público)
router.get('/compartilhamento', CompartilhamentoController.listarCompartilhamento); 
router.post('/compartilhamento', CompartilhamentoController.cadastrarCompartilhamento); 
router.patch('/compartilhamento/:id', CompartilhamentoController.editarCompartilhamento); 
router.delete('/compartilhamento/:id', CompartilhamentoController.apagarCompartilhamento);

module.exports = router;

