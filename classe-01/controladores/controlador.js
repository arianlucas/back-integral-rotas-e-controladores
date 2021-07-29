const imoveis = require("../dados/imoveis");


function consultarImoveis(req, res) {
    res.json(imoveis);
}

function consultarImovel(req, res) {
    const indice = Number(req.params.idImovel);
    const imovel = imoveis.find(imov => imov.id === indice);

    if (imovel) {
        res.json(imovel);
    } else {
        res.status(400);
        res.json('Imovel não encontrado!');
    }
}

module.exports = { consultarImoveis, consultarImovel };