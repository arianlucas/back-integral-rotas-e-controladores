const { alunos, cursos, msn } = require("../dados/colecao");

function consultarAlunos(req, res) {
    res.json(alunos);
}

function consultarAluno(req, res) {
    const indice = Number(req.params.idAluno);
    const aluno = alunos.find(aln => aln.id === indice);

    if (aluno) {
        res.status(200);
        msn.mensagem = aluno;
    } else if (indice !== Number(indice)) {
        res.status(400);
        msn.mensagem = "O ID deve ser um número válido."
    } else {
        res.status(404);
        msn.mensagem = "O aluno não foi encontrado."
    }

    res.json(msn);
}

function validarAluno(aluno) {
    if (!aluno.nome || aluno.nome === " ") {
        return "O nome do aluno não foi informado.";
    }
    if (typeof aluno.nome !== "string") {
        return "Somente letras devem ser colocadas no campo nome.";
    }

    if (!aluno.sobrenome || aluno.sobrenome === " ") {
        return "O sobrenome do aluno não foi informado."
    }
    if (typeof aluno.sobrenome !== "string") {
        return "Somente letras devem ser colocadas no campo sobrenome.";
    }

    if (!aluno.curso || aluno.curso === " ") {
        return "O curso do aluno não foi informado.";
    }
    if (typeof aluno.curso !== "string") {
        return "Somente letras devem ser colocadas no campo curso.";
    }

    if (typeof aluno.idade !== "number") {
        return "Somente numeros devem ser colocados no campo idade.";
    }
    if (aluno.idade < 18) {
        return "O aluno precisa ser maior de 18 anos.";
    }

    if (!cursos.includes(aluno.curso)) {
        return "O curso informado não faz parte da lista de cursos.";
    }
}

function adicionarAluno(req, res) {
    const tamanho = alunos.length - 1;
    const proximoId = alunos[tamanho].id + 1;

    const erro = validarAluno(req.body);

    if (erro) {
        res.status(400);
        msn.mensagem = erro;
        res.json(msn);
        return;
    }



    const novoAluno = {
        id: proximoId,
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        idade: req.body.idade,
        curso: req.body.curso
    }

    alunos.push(novoAluno)

    res.status(201);
    res.json();
}

function editarAluno(req, res) {
    const indice = Number(req.params.idAluno);
    const aluno = alunos.find(aln => aln.id === indice);

    if (!aluno) {
        res.status(404);
        msn.mensagem = "O aluno não foi encontrado."
        res.json(msn);
        return;
    }
    const erro = validarAluno({
        nome: req.body.nome ?? aluno.nome,
        sobrenome: req.body.sobrenome ?? aluno.sobrenome,
        idade: req.body.idade ?? aluno.idade,
        curso: req.body.curso ?? aluno.curso
    });

    if (erro) {
        res.status(400);
        msn.mensagem = erro;
        res.json(msn);
        return;
    }

    if (req.body.nome) {
        aluno.nome = req.body.nome;
    }
    if (req.body.sobrenome) {
        aluno.sobrenome = req.body.sobrenome;
    }
    if (req.body.idade) {
        aluno.idade = req.body.idade;
    }
    if (req.body.curso) {
        aluno.curso = req.body.curso;
    }

    msn.mensagem = "Alterações feitas"


    res.json(msn);
}

function substituirAluno(req, res) {
    const erro = validarAluno(req.body);

    if (erro) {
        res.status(400);
        msn.mensagem = erro;
        res.json(msn);
        return;
    }

    if (req.body.id !== Number(req.params.idAluno)) {
        res.status(400);
        msn.mensagem = "O campo 'id' deve ser igual na rota e no corpo da requisição";
        res.json(msn);
        return;
    }

    const indice = Number(req.params.idAluno);
    const aluno = alunos.find(aln => aln.id === indice);

    if (aluno) {
        aluno.nome = req.body.nome;
        aluno.sobrenome = req.body.sobrenome
        aluno.idade = req.body.idade;
        aluno.curso = req.body.curso;
        res.json(aluno);
    } else {
        const novoAluno = req.body;
        alunos.push(novoAluno);

        res.json(novoAluno);
    }
}

function deletarAluno(req, res) {
    const indice = Number(req.params.idAluno);
    const aluno = alunos.find(aln => aln.id === indice);
    let index = alunos.indexOf(aluno);

    if (aluno) {
        alunos.splice(index, 1);
        res.status(200);
        res.json(aluno)
        return;
    } else if (indice !== Number(indice)) {
        res.status(400);
        msn.mensagem = "O ID deve ser um número válido."
    } else {
        res.status(404);
        msn.mensagem = "O aluno não foi encontrado."
    }

    res.json(msn);
}

module.exports = {
    consultarAluno,
    consultarAlunos,
    validarAluno,
    adicionarAluno,
    editarAluno,
    substituirAluno,
    deletarAluno,
}