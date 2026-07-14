import AnimalModel from '../models/animal.model.js';

class AnimalController {
    static listarAnimais(req, res) {
        try {
            const animais = AnimalModel.listarAnimais();
            res.status(200).json(animais);
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro ao listar animais.' });
        }
    }

    static buscarAnimalPorCodigo(req, res) {
        try {
            const { codigo } = req.params;
            const animal = AnimalModel.buscarAnimalPorCodigo(codigo);

            if (!animal) {
                return res.status(404).json({ mensagem: 'Animal nao encontrado.' });
            }

            res.status(200).json(animal);
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro ao buscar animal.' });
        }
    }

    static cadastrarAnimal(req, res) {
        try {
            const { codigo, nome, especie, raca, idade, peso, nomeTutor, telefoneTutor } = req.body;

            if (!codigo || !nome || !especie || !raca || !idade || !peso || !nomeTutor || !telefoneTutor) {
                return res.status(400).json({ mensagem: 'Todos os campos devem ser preenchidos.' });
            }

            const animal = AnimalModel.cadastrarAnimal({
                codigo,
                nome,
                especie,
                raca,
                idade,
                peso,
                nomeTutor,
                telefoneTutor,
            });

            res.status(201).json({
                mensagem: 'Animal cadastrado com sucesso.',
                animal,
            });
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro ao cadastrar animal.' });
        }
    }

    static async atualizarAnimal(req, res) {
        try {
            const { codigo } = req.params;
            const { nome, especie, raca, idade, peso, nomeTutor, telefoneTutor } = req.body;

            if (!nome || !especie || !raca || !idade || !peso || !nomeTutor || !telefoneTutor) {
                return res.status(400).json({ mensagem: 'Todos os campos devem ser preenchidos.' });
            }

            const animal = await AnimalModel.atualizarAnimal(codigo, {
                nome,
                especie,
                raca,
                idade,
                peso,
                nomeTutor,
                telefoneTutor,
            });

            if (!animal) {
                return res.status(404).json({ mensagem: 'Animal nao encontrado.' });
            }

            res.status(200).json({
                mensagem: 'Animal atualizado com sucesso.',
                animal,
            });
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro ao atualizar animal.' });
        }
    }

    static async deletarAnimal(req, res) {
        try {
            const { codigo } = req.params;
            const animal = await AnimalModel.deletarAnimal(codigo);

            if (!animal) {
                return res.status(404).json({ mensagem: 'Animal nao encontrado.' });
            }

            res.status(200).json({
                mensagem: 'Animal removido com sucesso.',
                animal,
            });
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro ao deletar animal.' });
        }
    }
}

export default AnimalController;
