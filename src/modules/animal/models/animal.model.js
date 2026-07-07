import animais from "../../../config/database.js";

class AnimalModel {
    constructor(codigo, nome, especie, raca, idade, peso, nomeTutor, telefoneTutor) {
        this.codigo = codigo;
        this.nome = nome;
        this.especie = especie;
        this.raca = raca;
        this.idade = idade;
        this.peso = peso;
        this.nomeTutor = nomeTutor;
        this.telefoneTutor = telefoneTutor;
    }

    static cadastrarAnimal(dados) {
        const { codigo, nome, especie, raca, idade, peso, nomeTutor, telefoneTutor } = dados;

        const animal = new AnimalModel(
            codigo,
            nome,
            especie,
            raca,
            idade,
            peso,
            nomeTutor,
            telefoneTutor
        );

        animais.push(animal);
        return animal;
    }

    static listarAnimais() {
        return animais;
    }

    static buscarAnimalPorCodigo(codigo) {
        return animais.find(animal => animal.codigo === codigo);
    }

    static atualizarAnimal(codigo, dados) {
        const animal = AnimalModel.buscarAnimalPorCodigo(codigo);
        const { nome, especie, raca, idade, peso, nomeTutor, telefoneTutor } = dados;

        if (animal) {
            animal.nome = nome;
            animal.especie = especie;
            animal.raca = raca;
            animal.idade = idade;
            animal.peso = peso;
            animal.nomeTutor = nomeTutor;
            animal.telefoneTutor = telefoneTutor;
        }

        return animal;
    }

    static deletarAnimal(codigo) {
        const index = animais.findIndex(animal => animal.codigo === codigo);
        if (index !== -1) {
            const [animalRemovido] = animais.splice(index, 1);
            return animalRemovido;
        }

        return null;
    }
}

export default AnimalModel;
