"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroService = void 0;
const CategoriaLivroRepository_1 = require("../repository/CategoriaLivroRepository");
class CategoriaLivroService {
    constructor() {
        this.categoriaLivroRepository = CategoriaLivroRepository_1.CategoriaLivroRepository.getInstance();
    }
    listarLivros() {
        return this.categoriaLivroRepository.listarCategoriasLivro();
    }
}
exports.CategoriaLivroService = CategoriaLivroService;
