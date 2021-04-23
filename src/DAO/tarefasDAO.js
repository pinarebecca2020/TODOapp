const Tarefas = require("../Models/Tarefas");

class TarefasDAO {
    constructor(db) {
        this._db = db;
    }

    get db() {
        return this._db;
    }

    listaTarefas() {
        return new Promise((resolve, reject) => {

            const sql = "SELECT * FROM Tarefas";

            this.db.all(sql, (err, Tarefas) => {
                    if (err) {
                        reject(err)
                    } else {
                        console.log(Tarefas)
                        let TarefasModel = Tarefas.map(Tarefas => new Tarefas(Tarefas.ID, Tarefas.TITLE, Tarefas.DESCRIPTION, Tarefas.STATUS, Tarefas.DATE, Tarefas.ID_USER))
                        resolve(TarefasModel)
                    }
                }
            )
        })
    }

    listaTarefasId(id) {
        return new Promise((resolve, reject) => {

            const sql = "SELECT * FROM TAREFAS WHERE ID = ?";

            this.db.get(sql, id, (err, Tarefas) => {

                    if(!Tarefas){
                        resolve();
                        return
                    }

                    if (err) {
                        reject(err)
                    } else {
                        let Tarefas = new Tarefas(Tarefas.ID, Tarefas.TITLE, Tarefas.DESCRIPTION, Tarefas.STATUS, Tarefas.DATE, Tarefas.ID_USER)
                        resolve(Tarefas)
                    }
                }
            )
        })
    }
   
    inserirTarefas(Tarefas) {
        return new Promise((resolve, reject) => {

            const sql = 'INSERT INTO TAREFAS (TITLE, DESCRIPTION, STATUS, DATE, ID_USER) VALUES (?, ?, ?, ?, ?)';

            this.db.run(sql, [Tarefas.title, Tarefas.description, Tarefas.status, Tarefas.date, Tarefas.id_user], (error) => {
                if (error) {
                    reject(`Error ao adicionar Tarefas: ${error}`);
                } else {
                    resolve(Tarefas);
                };
            });
        })
    }

    updateTarefas(id, Tarefas){
        return new Promise((resolve, reject) => {

            const sql = "UPDATE TAREFAS SET TITLE = ?, DESCRIPTION = ?, STATUS = ?, DATE = ?, ID_USER = ? WHERE ID = ?";

            this.db.run(sql, [Tarefas.title, Tarefas.description, Tarefas.status, Tarefas.date, Tarefas.id_user, id], (error) => {
                if(!Tarefas){
                    resolve();
                    return
                }
                
                if(error){
                    reject(error);
                }else{
                    resolve("Tarefas foi atualizada com sucesso!");
                }
            })
        })
    }

    TarefasDelete(id){
        return new Promise((resolve, reject) => {

            const sql = "DELETE FROM TAREFAS WHERE ID = ?"

            this.db.run(sql, id, (error) => {
                if(error){
                    reject(error);
                }else{
                    resolve("Tarefas foi deletada com sucesso!");
                }
            })
        })
    }
}

module.exports = TarefasDAO;