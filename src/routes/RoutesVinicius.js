const express = require('express'); 
const router = express.Router(); 

const UsuariosController = require('../controllers/usuarios');
const CategoriaController = require('../controllers/categoria');  

router.get('/usuarios', UsuariosController.listarUsuarios); 
router.post('/usuarios', UsuariosController.cadastrarUsuarios); 
router.patch('/usuarios/:id', UsuariosController.editarUsuarios); 
router.delete('/usuarios/:id', UsuariosController.apagarUsuarios); 

router.get('/categoria', CategoriaController.listarCategoria); 
router.post('/categoria', CategoriaController.cadastrarCategoria); 
router.patch('/categoria/:id', CategoriaController.editarCategoria); 
router.delete('/categoria/:id', CategoriaController.apagarCategoria); 

module.exports = router;