const tarefas = require("../models/tarefas");
const tarefasDAO = require("../DAO/tarefasDAO");
const validarTarefasId = require("../middleware/validarTarefasId");

function tarefasController(app, db) {
    const tarefasDAO = new tarefasDAO(db);

    app.get('/tarefas', async (req, res) => {
        try {
            const taskGet = await tarefasDAO.listaTarefas();
            res.send(taskGet);

        } catch (error) {
            res.status(503).send({ "message": error });
        }
    });

    app.get('/tarefas/:id', validarTarefasId, async (req, res) => {
        try {
            const id = req.params.id;
            const tarefasId = await tarefasDAO.listaTarefasId(id);
            
            res.send(tarefasId);

        } catch (error) {
            res.status(503).send({ "message": error });
        }
    });

    app.post('/tarefas', async (req, res) => {
        try {
            const body = req.body;

            const tarefas = new tarefas(0, body.title, body.description, body.status, body.date, body.id_user);

            const tarefasPost = await tarefasDAO.inserirTarefas(tarefas)
            res.send(tarefasPost);
        } catch (error) {
            res.status(503).send({ "message": error });
        }
    });

    app.put('/tarefas/:id', validarTarefasId, async (req, res) => {
        try {
            const body = req.body;
            const id = req.params.id;
            const tarefas = new tarefas(0, body.title, body.description, body.status, body.date, body.id_user);

            const tarefasPut = await tarefasDAO.updateTarefas(id, tarefas);
            res.send(tarefasPut);
        } catch (error) {
            res.status(503).send({ "message": error });
        }
    });

    app.delete('/tarefas/:id', validarTarefasId, async (req, res) => {
        try {
            const id = req.params.id;

            const tarefasDel = await tarefasDAO.tarefasDelete(id);
            res.send(tarefasDel);
        } catch (error) {
            res.status(503).send({ "message": error });
        }
    });
};

module.exports = tarefasController;