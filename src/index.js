import express from 'express';
import Animal from './DTOs/Animal.js';

const app = express();
const port = 3000;

app.use(express.json());

const animais = [];

function validarAnimal(dados) {
    const camposObrigatorios = [
        'codigo',
        'nome',
        'especie',
        'raca',
        'idade',
        'peso',
        'nomeTutor',
        'telefoneTutor',
    ];

    return camposObrigatorios.filter(
        campo => dados[campo] === undefined || dados[campo] === null || dados[campo] === '');
}

app.get('/', (req, res) => {
    res.send('API de cadastro de animais');
});

app.get('/animais', (req, res) => {
    res.status(200).json(animais);
});

app.get('/animais/:codigo', (req, res) => {
    const animal = animais.find((item) => item.codigo === req.params.codigo);

    if (!animal) {
        return res.status(404).json({ mensagem: 'Animal nao encontrado.' });
    }

    return res.status(200).json(animal);
});

app.post('/animais', (req, res) => {
    try {
        const erros = validarAnimal(req.body);

        if (erros.length > 0) {
            return res.status(400).json({
                mensagem: 'Preencha todos os campos obrigatorios.',
                campos: erros,
            });
        }

        const { codigo, nome, especie, raca, idade, peso, nomeTutor, telefoneTutor } = req.body;
        const codigoTexto = String(codigo);
        const animalJaCadastrado = animais.some(item => item.codigo === codigoTexto);

        if (animalJaCadastrado) {
            return res.status(409).json({ mensagem: 'Ja existe um animal com esse codigo.' });
        }

        const animal = new Animal(
            codigoTexto,
            nome,
            especie,
            raca,
            Number(idade),
            Number(peso),
            nomeTutor,
            telefoneTutor
        );

        animais.push(animal);

        return res.status(201).json({
            mensagem: 'Animal cadastrado com sucesso.',
            animal,
        });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao cadastrar animal.' });
    }
});

app.put('/animais/:codigo', (req, res) => {
    try {
        const indiceAnimal = animais.findIndex((item) => item.codigo === req.params.codigo);

        if (indiceAnimal === -1) {
            return res.status(404).json({ mensagem: 'Animal nao encontrado.' });
        }

        const animalAtual = animais[indiceAnimal];
        // variável criada a partir dos valores da atual requisição ou antigo objeto
        const dadosAtualizados = {
            codigo: animalAtual.codigo,
            nome: req.body.nome ?? animalAtual.nome,
            especie: req.body.especie ?? animalAtual.especie,
            raca: req.body.raca ?? animalAtual.raca,
            idade: req.body.idade ?? animalAtual.idade,
            peso: req.body.peso ?? animalAtual.peso,
            nomeTutor: req.body.nomeTutor ?? animalAtual.nomeTutor,
            telefoneTutor: req.body.telefoneTutor ?? animalAtual.telefoneTutor,
        };

        const animalAtualizado = new Animal(
            dadosAtualizados.codigo,
            dadosAtualizados.nome,
            dadosAtualizados.especie,
            dadosAtualizados.raca,
            Number(dadosAtualizados.idade),
            Number(dadosAtualizados.peso),
            dadosAtualizados.nomeTutor,
            dadosAtualizados.telefoneTutor
        );

        animais[indiceAnimal] = animalAtualizado;

        return res.status(200).json({
            mensagem: 'Animal atualizado com sucesso.',
            animal: animalAtualizado,
        });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao atualizar animal.' });
    }
});

app.patch('/animais/:codigo', (req, res) => {
    try {
        const indiceAnimal = animais.findIndex((item) => item.codigo === req.params.codigo);

        if (indiceAnimal === -1) {
            return res.status(404).json({ mensagem: 'Animal nao encontrado.' });
        }

        const camposPermitidos = [
            'nome',
            'especie',
            'raca',
            'idade',
            'peso',
            'nomeTutor',
            'telefoneTutor',
        ];

        const camposRecebidos = Object.keys(req.body);

        if (camposRecebidos.length === 0) {
            return res.status(400).json({ mensagem: 'Informe ao menos um campo para atualizar.' });
        }

        const camposInvalidos = camposRecebidos.filter(campo => !camposPermitidos.includes(campo));

        if (camposInvalidos.length > 0) {
            return res.status(400).json({
                mensagem: 'Campos invalidos para atualizacao.',
                campos: camposInvalidos,
            });
        }

        const animalAtual = animais[indiceAnimal];
        const dadosAtualizados = {
            codigo: animalAtual.codigo,
            nome: req.body.nome ?? animalAtual.nome,
            especie: req.body.especie ?? animalAtual.especie,
            raca: req.body.raca ?? animalAtual.raca,
            idade: req.body.idade ?? animalAtual.idade,
            peso: req.body.peso ?? animalAtual.peso,
            nomeTutor: req.body.nomeTutor ?? animalAtual.nomeTutor,
            telefoneTutor: req.body.telefoneTutor ?? animalAtual.telefoneTutor,
        };

        const animalAtualizado = new Animal(
            dadosAtualizados.codigo,
            dadosAtualizados.nome,
            dadosAtualizados.especie,
            dadosAtualizados.raca,
            Number(dadosAtualizados.idade),
            Number(dadosAtualizados.peso),
            dadosAtualizados.nomeTutor,
            dadosAtualizados.telefoneTutor
        );

        animais[indiceAnimal] = animalAtualizado;

        return res.status(200).json({
            mensagem: 'Animal atualizado parcialmente com sucesso.',
            animal: animalAtualizado,
        });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao atualizar animal.' });
    }
});

app.delete('/animais/:codigo', (req, res) => {
    const indiceAnimal = animais.findIndex(item => item.codigo === req.params.codigo);

    if (indiceAnimal === -1) {
        return res.status(404).json({ mensagem: 'Animal nao encontrado.' });
    }

    const [animalRemovido] = animais.splice(indiceAnimal, 1);

    return res.status(200).json({
        mensagem: 'Animal removido com sucesso.',
        animal: animalRemovido,
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
