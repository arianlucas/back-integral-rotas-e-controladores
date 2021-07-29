const express = require("express");
const alunos = require("./controladores/controlador");

const roteador = express();

roteador.get("/alunos", alunos.consultarAlunos)
roteador.get("/alunos/:idAluno", alunos.consultarAluno)
roteador.post("/alunos", alunos.adicionarAluno)
roteador.patch("/alunos/:idAluno", alunos.editarAluno)
roteador.put("/alunos/:idAluno", alunos.substituirAluno)
roteador.delete("/alunos", alunos.deletarAluno)

module.exports = roteador;
