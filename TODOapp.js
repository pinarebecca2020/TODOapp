const express = require('express');
const bodyParser = require('body-parser');
const db = require('./infra/sqlite-db');

const app = express();
const port = 3000;



app.use(bodyParser.json());

const tarefasController = require('./Controllers/tarefasController');
const usuariosController = require('./Controllers/usuariosController');

usuariosController(app, db);
tarefasController(app, db);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});