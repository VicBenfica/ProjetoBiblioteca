"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroRepository = void 0;
class CategoriaLivroRepository {
    static instance;
    categoriaLivros = [];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaLivroRepository();
        }
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
