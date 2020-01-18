const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const {setupWebsocket} = require('./websocket');

// Porta do servidor
const PORT = 3333 || process.env.PORT;

const app = express(); // A aplicação principal
const server = http.Server(app);

setupWebsocket(server);

// Conexão ao banco de dados MongoDB
mongoose.connect('mongodb+srv://stack10:stack10@cluster0-crzfp.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Conectado ao mongoDB");
});

// Middlewares
app.use(cors())
app.use(express.json()); // Configura a leitura de JSON
app.use(routes); // Rotas

server.listen(PORT, ()=> {
    console.log(`Servidor rodando na porta ${PORT}`)
})