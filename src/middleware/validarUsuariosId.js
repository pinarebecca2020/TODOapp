const usuariosDao = require("../DAO/usuariosDao");
const db = require("../infra/sqlite-db");

async function validarUsuariosId(req, res, next) {

  const usuariosDao = new usuariosDao(db);

  const { id } = req.params;
  const usuarios = await usuariosDao.listaUsuariosId(id);

  if (usuarios) {
    req.usuarios = usuarios;
    next();
  } else {
    res.status(404).json({ message: "ID not found." })
  }
}

module.exports = validarUsuariosId;