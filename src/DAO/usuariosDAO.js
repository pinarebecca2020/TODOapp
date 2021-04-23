const Usuarios = require("../Models/usuarios");

class UsuariosDao {
    constructor(db) {
        this._db = db;
    }

    get db() {
        return this._db;
    }

    listaUsuarios() {
        return new Promise((resolve, reject) => {

            const sql = "SELECT * FROM USUARIOS";

            this.db.all(sql, (err, usuarios) => {
                    if (err) {
                        reject(err)
                    } else {
                        console.log(usuarios)
                        let Usuarios = usuarios.map(usuarios => new Usuarios(usuarios.ID, usuarios.NAME, usuarios.EMAIL, usuarios.PASSWORD))
                        resolve(Usuarios)
                    }
                }
            )
        })
    }

    listaUsuariosId(id) {
        return new Promise((resolve, reject) => {

            const sql = "SELECT * FROM USUARIOS WHERE ID = ?";

            this.db.get(sql, id, (err, usuarios) => {

                    if(!usuarios){
                        resolve();
                        return;
                    }

                    if (err) {
                        reject(err);
                    } else {
                        let Usuarios = new Usuarios(usuarios.ID, usuarios.NAME, usuarios.EMAIL, usuarios.PASSWORD);
                        resolve(Usuarios);
                    }
                }
            )
        })
    }
   
    inserirUsuarios(usuarios) {
        return new Promise((resolve, reject) => {

            const sql = 'INSERT INTO USUARIOS (NAME, EMAIL, PASSWORD) VALUES (?, ?, ?)';

            this.db.run(sql, [usuarios.name, usuarios.email, usuarios.password], (error) => {
                if (error) {
                    reject(`Error ao adicionar usuarios: ${error}`);
                } else {
                    resolve(usuarios);
                };
            });
        })
    }

    updateUsuarios(id, usuarios){
        return new Promise((resolve, reject) => {

            const sql = "UPDATE USUARIOS SET NAME = ?, EMAIL = ?, PASSWORD = ? WHERE ID = ?"

            this.db.run(sql, [usuarios.name, usuarios.email, usuarios.password, id], (error) => {
                if(!usuarios){
                    resolve();
                    return;
                }

                if(error){
                    reject(error);
                }else{
                    resolve("usuarios successfully updated!");
                }
            })
        })
    }

    deletarUsuarios(id){
        return new Promise((resolve, reject) => {

            const sql = "DELETE FROM USUARIOS WHERE ID = ?"

            this.db.run(sql, id, (error) => {

                if(error){
                    reject(error);
                }else{
                    resolve("usuarios foi deletado com sucesso!");
                }
            })
        })
    }
}

module.exports = UsuariosDao