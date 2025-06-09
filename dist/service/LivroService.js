"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroService = void 0;
const Livro_1 = require("../model/Livro");
const LivroRepository_1 = require("../repository/LivroRepository");
class LivroService {
    livroRepo = LivroRepository_1.LivroRepository.getInstance();
    idCounter = 1; // contador local
    novoLivro(data) {
        // Validação de campos obrigatórios
        if (!data.titulo || !data.isbn || !data.autor || !data.editora || !data.edicao || !data.categoria_id) {
            throw new Error("Favor informar titulo, ISBN, autor, editora, edição e categoria.");
        }
        // Criação do usuário
        const livro = new Livro_1.Livro(this.idCounter++, data.titulo, data.isbn, data.autor, data.edicao, data.editora, data.categoria_id
        // status inicial
        ); // dia de suspensão
        // Inserção no repositório
        this.livroRepo.insereLivro(livro);
        return livro;
    }
    removeLivro(id, estoque) {
        // Verifica se existe algum exemplar emprestado
        const emprestado = estoque.some(e => e.livro_id === id && e.quantidade_emprestada > 0);
        if (emprestado) {
            console.log("Não é possível remover: o livro possui exemplares emprestados.");
            return false;
        }
        const index = this.livroRepo.buscarIndexPorId(id);
        if (index === -1) {
            console.log("Livro não encontrado.");
            return false;
        }
        this.livroRepo.removerLivroPorIndex(index);
        console.log("Livro removido com sucesso.");
        return true;
    }
    atualizarLivro(id, novosDados) {
        const index = this.livroRepo.buscarIndexPorId(id);
        if (index === -1)
            return undefined;
        const livroAtual = this.livroRepo.buscarLivroPorId(id);
        const livroAtualizado = {
            id: novosDados.id ?? livroAtual.id,
            titulo: novosDados.titulo ?? livroAtual.titulo,
            autor: novosDados.autor ?? livroAtual.autor,
            editora: novosDados.editora ?? livroAtual.editora,
            edicao: novosDados.edicao ?? livroAtual.edicao,
            isbn: novosDados.isbn ?? livroAtual.isbn,
            categoria_id: novosDados.categoria_id ?? livroAtual.categoria_id
        };
        this.livroRepo.atualizarLivroPorIndex(index, livroAtualizado);
        return livroAtualizado;
    }
    detalhesLivro(id) {
        return this.livroRepo.buscarLivroPorId(id);
    }
    listar(id) {
        return this.livroRepo.listarLivros(id);
    }
}
exports.LivroService = LivroService;
