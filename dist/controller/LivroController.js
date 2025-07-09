"use strict";
// src/controller/LivroController.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroController = void 0;
const LivroService_1 = require("../service/LivroService");
class LivroController {
    livroService = new LivroService_1.LivroService();
    criarLivro(req, res) {
        try {
            const livro = this.livroService.novoLivro(req.body);
            res.status(201).json(livro); // 201 Created é CORRETO para criação
        }
        catch (error) {
            let message = "Não foi possível inserir livro!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({ message: message });
        }
    }
    // ALTERADO: Método removerLivro
    removerLivro(req, res) {
        try {
            // Decidir se a remoção é por ID interno ou por ISBN.
            // A rota é /:isbn, então vamos remover por ISBN.
            const isbn = req.params.isbn; // Pega o ISBN como string da URL
            if (!isbn) {
                res.status(400).json({ message: "ISBN não fornecido para remoção!" });
                return;
            }
            // O service agora cuida da verificação de exemplares emprestados
            const removido = this.livroService.removeLivro(isbn); // ALTERADO: Passa ISBN para o service
            if (!removido) {
                res.status(400).json({ message: "Não foi possível remover o livro. Ele pode possuir exemplares emprestados ou não foi encontrado." });
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
            const isbn = req.params.isbn;
            const novosDados = req.body;
            if (!isbn) {
                res.status(400).json({ message: "ISBN não fornecido para atualização!" });
                return;
            }
            const livro = this.livroService.atualizarLivro(isbn, novosDados);
            if (!livro) {
                res.status(404).json({ message: "Livro não encontrado para atualização." });
                return;
            }
            res.status(200).json(livro); // 200 OK é CORRETO para atualização
        }
        catch (error) {
            let message = "Não foi possível atualizar o livro!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({ message });
        }
    }
    detalharNovoLivro(req, res) {
        try {
            const isbn = req.params.isbn;
            if (!isbn) {
                res.status(400).json({ message: "ISBN não fornecido!" });
                return;
            }
            const livro = this.livroService.detalhesLivro(isbn);
            if (!livro) {
                res.status(404).json({ message: "Livro não encontrado." });
                return;
            }
            res.status(200).json(livro); // 200 OK é CORRETO para detalhamento
        }
        catch (error) {
            let message = "Não foi possível detalhar o livro!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({ message: message });
        }
    }
    listar(req, res) {
        try {
            const livros = this.livroService.listar();
            res.status(200).json(livros); // 200 OK é CORRETO para listagem
        }
        catch (error) {
            let message = "Não foi possível listar!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({ message: message });
        }
    }
}
exports.LivroController = LivroController;
