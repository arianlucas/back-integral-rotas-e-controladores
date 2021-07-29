const express = require("express");

function verificarSenha(req, res, next) {
    if (req.query.senha !== "cubos123") {
        res.status(401);
        res.json("Senha Incorreta ou Não Informada");
    } else {
        next();
    }
}

module.exports = verificarSenha;