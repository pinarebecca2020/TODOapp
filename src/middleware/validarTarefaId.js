const tarefasDao = require("../DAO/tarefasDAO");
const db = require("../infra/sqlite-db");

async function validarTarefasId(req, res, next) {

  const tarefasDao = new tarefasDao(db);

  const { id } = req.params;
  const tarefas = await tarefasDao.listaTarefasId(id);

  if (tarefas) {
    req.tarefas = tarefas;
    next();
  } else {
    res.status(404).json({ message: "ID not found." })
  }
}

module.exports = validarTarefasId;