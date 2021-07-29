const express = require("express");
const imoveis = require("./controladores/controlador");

const roteador = express();

roteador.get("/imoveis", imoveis.consultarImoveis);
roteador.get("/imoveis/:idImovel", imoveis.consultarImovel);

module.exports = roteador;


