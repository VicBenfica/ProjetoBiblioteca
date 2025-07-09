"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroRepository = void 0;
const CategoriaLivro_1 = require("../model/CategoriaLivro");
//importa o model
class CategoriaLivroRepository {
    static instance;
    //instance: padrão singleton, garante que só existe um instancia
    //do repositorio durante o funcionamento do progrma
    categoriaLivros = [];
    //Array que guarada a categoria dos livros
    constructor() { }
    popularMock() {
        this.categoriaLivros = [
            new CategoriaLivro_1.CategoriaLivro(1, "Romance"),
            new CategoriaLivro_1.CategoriaLivro(2, "Computação"),
            new CategoriaLivro_1.CategoriaLivro(3, "Letras"),
            new CategoriaLivro_1.CategoriaLivro(4, "Gestão")
        ];
        console.log("Livros Mock populados:", this.categoriaLivros);
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaLivroRepository();
        }
        //criação de instancia
        return this.instance;
    }
    listarLivros() {
        return this.categoriaLivros;
    }
    buscarPorId(id) {
        return this.categoriaLivros.find(l => l.id === id);
    }
}
exports.CategoriaLivroRepository = CategoriaLivroRepository;
