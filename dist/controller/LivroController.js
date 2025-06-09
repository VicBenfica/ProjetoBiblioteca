"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroController = void 0;
const LivroService_1 = require("../service/LivroService");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
class LivroController {
    livroService = new LivroService_1.LivroService();
    criarLivro(req, res) {
        try {
            const livro = this.livroService.novoLivro(req.body);
            res.status(201).json(livro);
        }
        catch (error) {
            let message = "Não foi possível inserir livro!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    removerLivro(req, res) {
        try {
            const id = Number(req.body.id);
            if (!id) {
                res.status(400).json({ message: "ID inválido!" });
                return;
            }
            const estoques = EstoqueRepository_1.EstoqueRepository.getInstance().listarEstoques(); // correto
            const removido = this.livroService.removeLivro(id, estoques); // correto
            if (!removido) {
                res.status(400).json({ message: "Não foi possível remover o livro, ele pode estar emprestado." });
            }
            else {
                res.status(200).json({ message: "Livro removido com sucesso." });
            }
        }
        catch (error) {
            let message = "Erro ao remover o livro.";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({ message });
        }
    }
    atualizarNovoLivro(req, res) {
        try {
            const id = Number(req.params.id);
            const novosDados = req.body;
            const livro = this.livroService.atualizarLivro(id, novosDados);
            res.status(201).json(livro);
        }
        catch (error) {
            let message = "Não foi possível atualizar o livro!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    detalharNovoLivro(req, res) {
        try {
            const id = Number(req.params.id);
            const livro = this.livroService.detalhesLivro(id);
            res.status(201).json(livro);
        }
        catch (error) {
            let message = "Não foi possível detalhar o livro!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    listar(req, res) {
        try {
            const livro = this.livroService.listar(req.body.id);
            res.status(201).json(livro);
        }
        catch (error) {
            let message = "Não foi possível listar!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
}
exports.LivroController = LivroController;
