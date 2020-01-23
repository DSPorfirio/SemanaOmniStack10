const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

mongoose.set('useCreateIndex', true);

setupWebsocket(server);

const { MONGO_USER, MONGO_PASS, CONNECT } = require('../.env');


// connect database {
mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0-timv0.mongodb.net/${CONNECT}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// connect database }

app.use(cors());
app.use(express.json());
app.use(routes);

// Métodos HTTP: GET, POST, PUT, DELETE

// Tipos de parâmetros:

// Query Params: request.query (Filtros, ordenação, paginação, ...)
// Route Params: request.params (Identificar um recurso na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)

//MongoDB (Não-relacional)


server.listen(3333);