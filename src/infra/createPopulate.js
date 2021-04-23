const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');


const USUARIOS_SCHEMA = `
CREATE TABLE IF NOT EXISTS "USUARIOS" (
    "ID" INTEGER PRIMARY KEY AUTOINCREMENT,
    "NAME" varchar(64),
    "EMAIL" varchar(64),
    "PASSWORD" varchar(64)
  );`;

const ADD_USUARIOS_DATA = `
INSERT INTO USUARIOS (ID, NAME, EMAIL, PASSWORD)
VALUES 
    (1, 'Euclides Junior', 'euclides.junior@bol.com.br', '*******'),
    (2, 'Olaf Boneco', 'olaf.boneco@gmail.com', '********'),
    (3, 'Maria Aparecida', 'maria_ap@yahoo.com', '********')
`

function criaTabUsuarios() {
    db.run(USUARIOS_SCHEMA, (error)=> {
       if (error) console.log("Erro ao criar tabela de usuários");
    });
}


function populaTabUsuarios() {
    db.run(ADD_USUARIOS_DATA, (error)=> {
       if (error) console.log("Erro ao popular tabela de usuários");
    });
}



const TAREFAS_SCHEMA = `
CREATE TABLE IF NOT EXISTS TAREFAS (
    ID INTEGER PRIMARY KEY AUTOINCREMENT, 
    TITLE VARCHAR(64),
    DESCRIPTION TEXT,
    STATUS VARCHAR(32),
    DATE VARCHAR(32),
    ID_USER INTEGER,
    FOREIGN KEY(ID_USER) REFERENCES USUARIOS(ID)
);`;

const ADD_TAREFAS_DATA = `INSERT INTO TAREFAS (TITLE, DESCRIPTION, STATUS, DATE, ID_USER)
VALUES 
       ('Tênis', 'Praticar tênis segunda e quarta', 'Continuo', '2021-01-10', 2),
       ('Médico', 'Consulta com Dr. Ayrton sexta', 'TODO', '2021-01-13', 1),
       ('Pagar contas', 'Pagar boletos de internet e luz', 'DOING', '2021-01-02', 2),
       ('Mercado', 'Pegar lista e fazer compras', 'TODO', '2021-01-08', 2),
       ('Dentista', 'Consulta com Dra Andreia sexta', 'TODO', '2021-01-11', 1),
       ('Pagar financiamento carro', 'Pagar parcela do mês', 'Contínuo', '2021-01-05', 3)
`

function criaTabelaTarefas() {
    db.run(TAREFAS_SCHEMA, (error)=> {
        if(error) console.log("Erro ao criar tabela de TAREFAS");
    });
}


function populaTabTarefas() {
    db.run(ADD_TAREFAS_DATA, (error)=> {
       if (error) console.log("Erro ao popular tabela de TAREFAS");
    });
}

db.serialize( ()=> {
    criaTabUsuarios();
    populaTabUsuarios();
    criaTabelaTarefas();
    populaTabTarefas();
});