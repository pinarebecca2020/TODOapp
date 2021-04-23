class Tarefas {

    constructor(id,titulo,descricao,status,data, id_usuario) {
  
            this.id = id,
            this.titulo = titulo,
            this.descricao = descricao,
            this.status = status,
            this.data = data,
            this.id_usuario = id_usuario
    }
  
  }
  
  module.exports = Tarefas;