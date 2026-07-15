import pool from "../../../config/database.js";

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

    static async cadastrarAnimal(dados) {
        const { codigo, nome, especie, raca, idade, peso, nomeTutor, telefoneTutor } = dados;
        const valores = [codigo, nome, especie, raca, idade, peso, nomeTutor, telefoneTutor];
        const query = `
            INSERT INTO animal
                (codigo, nome, especie, raca, idade, peso, nome_tutor, telefone_tutor)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `;

        const resultado = await pool.query(query, valores);

        return resultado.rows[0];
    }

    static async listarAnimais() {
        const query = 'SELECT * FROM animal';
        const resultado = await pool.query(query);

        return resultado.rows;
    }

    static async buscarAnimalPorCodigo(codigo) {
        const valores = [codigo];
        const query = 'SELECT * FROM animal WHERE codigo = $1';
        const resultado = await pool.query(query, valores);

        return resultado.rows[0] || null;
    }

    static async atualizarAnimal(codigo, dados) {
        const validacao = await this.buscarAnimalPorCodigo(codigo);
        
        if (!validacao) {
            throw new Error('Animal não encontrado');
        }

        const { nome, especie, raca, idade, peso, nomeTutor, telefoneTutor } = dados;
        const valores = [nome, especie, raca, idade, peso, nomeTutor, telefoneTutor, codigo];
        const query = `
            UPDATE animal
            SET nome = $1,
                especie = $2,
                raca = $3,
                idade = $4,
                peso = $5,
                nome_tutor = $6,
                telefone_tutor = $7
            WHERE codigo = $8
            RETURNING *
        `;
        const resultado = await pool.query(query, valores);

        return resultado.rows[0] || null;
    }

    static async deletarAnimal(codigo) {
        const query = 'DELETE FROM animal WHERE codigo = $1 RETURNING *';
        const resultado = await pool.query(query, [codigo]);

        return resultado.rows[0] || null;
    }
}

export default AnimalModel;
