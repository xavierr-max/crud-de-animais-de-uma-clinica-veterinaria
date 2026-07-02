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

    static cadastrarAnimal(matricula, nome, email) {
        const animal = { matricula, nome, email };
        animais.push(animal);
    }

    static listarAnimais() {
        return animais;
    }

    static buscarAnimalPorCodigo(codigo) {
        return animais.find(animal => animal.codigo === codigo);
    }

    static atualizarAnimal(codigo, nome, especie, raca, idade, peso, nomeTutor, telefoneTutor) {
        const animal = AnimalModel.buscarAnimalPorCodigo(codigo);
        if (animal) {
            animal.nome = nome;
            animal.especie = especie;
            animal.raca = raca;
            animal.idade = idade;
            animal.peso = peso;
            animal.nomeTutor = nomeTutor;
            animal.telefoneTutor = telefoneTutor;
        }
    }

    static deletarAnimal(codigo) {
        const index = animais.findIndex(animal => animal.codigo === codigo);
        if (index !== -1) {
            animais.splice(index, 1);
        }
    }
}

export default AnimalModel;