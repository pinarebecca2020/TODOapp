const usuarios = require("../models/usuarios");
const usuariosDAO = require("../DAO/usuariosDAO");
const validarUsuariosId = require("../middleware/validarUsuariosId");

async function usuariosController(app, db) {
    const usuariosDAO = new usuariosDAO(db);

    app.get('/usuarios', async (req, res) => {
        try {
            const usuariosGet = await usuariosDAO.listaUsuarios();
            res.send(usuariosGet); 
        } catch (error) {
            res.status(503).send({"message": error});
        }
    });

    app.get('/usuarios/:id', validarUsuariosId, async (req, res) => {
        try {
            const body = req.body;
            const id = req.params.id;
            
            const usuariosId = await usuariosDAO.listaUsuariosId(id);
            res.send(usuariosId);
        } catch (error) {
            res.status(503).send({ message: error });
        }
    });

    app.post('/usuarios', async (req, res) => {
        try {
            const body = req.body;
            const usuarios = new usuarios(0, body.name, body.email, body.password);

            const usuariosPost = await usuariosDAO.inserirUsuarios(usuarios);
            res.send(usuariosPost);
        } catch (error) {
            res.status(503).send({"message": error});
        }
    });

    app.put('/usuarios/:id', validarUsuariosId, async (req, res) => {
        try {
            const body = req.body;
            const id = req.params.id;
            const usuarios = new usuarios(0, body.name, body.email, body.password);

            let usuariosPut = await usuariosDAO.updateUsuarios(id, usuarios);
            res.send(usuariosPut);
        } catch (error) {
            res.status(503).send({"message": error});
        }
    });

    app.delete('/usuarios/:id', validarUsuariosId, async (req, res) => {
        try {
            const body = req.body;
            const id = req.params.id;

            const usuariosDel = await usuariosDAO.deletarUsuarios(id);
            res.send(usuariosDel);
        } catch (error) {
            res.status(503).send({"message": error});
        }
    });
};

module.exports = usuariosController;