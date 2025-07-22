"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroController = void 0;
const LivroService_1 = require("../service/LivroService");
class CategoriaLivroController {
    categoriaLivroService = new LivroService_1.LivroService();
    listarLivro(req, res) {
        try {
            const lista = this.categoriaLivroService.listarLivros();
            res.status(200).json(lista);
        }
        catch (error) {
            let message = "Não conseguimos realizar a listagem de livros";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
}
exports.CategoriaLivroController = CategoriaLivroController;
