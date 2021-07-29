const express = require("express");
const roteador = require("./roteadores");
const intermediario = require("./intermediarios")
const app = express();

app.use(express.json());
app.use(intermediario)
app.use(roteador);


app.listen(8000)