require('dotenv').config();
const express = require('express'); 
const cors = require('cors');

const router = require('./src/routes/routes'); 

const app = express(); 
const porta = process.env.PORT || 3333;

// Middlewares
app.use(cors()); 
app.use(express.json()); 

// Rota padrão (ANTES das outras rotas)
app.get('/', (request, response) => {
    response.json({
        sucesso: true,
        mensagem: 'API funcionando!',
        versao: '1.0.0',
        endpoints: {
            usuarios: '/usuarios',
            personagens: '/personagens', 
            arsenal: '/arsenal',
            mapas: '/mapas',
            noticias: '/noticias',
            suporte: '/suporte',
            faq: '/faq',
            compartilhamento: '/compartilhamento',
            categorias: '/categoria',
            assuntos: '/Assuntos',
            login: '/login'
        }
    });
});

// Demais rotas
app.use(router);

// Rota para 404 (DEPOIS de todas as rotas)
app.use('*', (req, res) => {
    res.status(404).json({
        sucesso: false,
        mensagem: 'Rota não encontrada.'
    });
});

app.listen(porta, () => {
    console.log(`🚀 Servidor iniciado em http://localhost:${porta}`);
});

