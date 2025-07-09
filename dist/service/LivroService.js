"use strict";
// src/service/LivroService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroService = void 0;
const Livro_1 = require("../model/Livro");
const LivroRepository_1 = require("../repository/LivroRepository");
const EstoqueRepository_1 = require("../repository/EstoqueRepository"); // NOVO: Importar EstoqueRepository para validação
class LivroService {
    livroRepo = LivroRepository_1.LivroRepository.getInstance();
    estoqueRepo = EstoqueRepository_1.EstoqueRepository.getInstance();
    idCounter = 1;
    novoLivro(data) {
        if (!data.titulo || !data.isbn || !data.autor || !data.editora || !data.edicao || !data.categoria_id) {
            throw new Error("Favor informar título, ISBN, autor, editora, edição e categoria.");
        }
        const isbnExistente = this.livroRepo.listarLivros().some(l => l.isbn === data.isbn);
        if (isbnExistente) {
            throw new Error("Já existe um livro com esse ISBN.");
        }
        const combinacaoDuplicada = this.livroRepo.listarLivros().some(l => l.autor === data.autor &&
            l.editora === data.editora &&
            l.edicao === data.edicao);
        if (combinacaoDuplicada) {
            throw new Error("Já existe um livro com esse autor, editora e edição.");
        }
        const livro = new Livro_1.Livro(this.idCounter++, data.titulo, data.autor, data.editora, data.edicao, data.isbn, data.categoria_id);
        this.livroRepo.insereLivro(livro);
        return livro;
    }
    // CORREÇÃO AQUI: Método removeLivro para aceitar ISBN (string)
    removeLivro(isbn) {
        const livroParaRemover = this.livroRepo.buscarLivroPorIsbn(isbn); // ALTERADO: Busca por ISBN
        if (!livroParaRemover) {
            console.log("Livro não encontrado para remoção.");
            return false;
        }
        // Verifica se existem exemplares emprestados para este livro (usando o ISBN do livro)
        const exemplaresEmprestados = this.estoqueRepo.listarEstoque().some(exemplar => exemplar.livro_isbn === livroParaRemover.isbn && exemplar.status === 'emprestado');
        if (exemplaresEmprestados) {
            console.log("Não é possível remover: o livro possui exemplares emprestados.");
            throw new Error("Não é possível remover o livro, ele possui exemplares emprestados."); // Adicionar throw para o controller pegar
        }
        // Se a regra for que não pode remover o livro se ele tiver QUALQUER exemplar (mesmo disponível):
        const temQualquerExemplar = this.estoqueRepo.listarEstoque().some(exemplar => exemplar.livro_isbn === livroParaRemover.isbn);
        if (temQualquerExemplar) {
            throw new Error("Remova todos os exemplares deste livro antes de remover o livro mestre.");
        }
        // Encontrar o ID interno do livro para remover por índice no LivroRepository
        const index = this.livroRepo.buscarIndexPorId(livroParaRemover.id); // Usar o ID interno do livro encontrado
        if (index === -1) {
            console.log("Livro não encontrado pelo índice após busca inicial. (Erro interno)");
            return false;
        }
        this.livroRepo.removerLivroPorIndex(index);
        console.log("Livro removido com sucesso.");
        return true;
    }
    atualizarLivro(isbnParam, novosDados) {
        const livroAtual = this.livroRepo.buscarLivroPorIsbn(isbnParam);
        if (!livroAtual)
            return undefined;
        const index = this.livroRepo.listarLivros().findIndex(l => l.isbn === isbnParam);
        if (index === -1)
            return undefined;
        const livroAtualizado = {
            id: novosDados.id ?? livroAtual.id,
            titulo: novosDados.titulo ?? livroAtual.titulo,
            autor: novosDados.autor ?? livroAtual.autor,
            editora: novosDados.editora ?? livroAtual.editora,
            edicao: novosDados.edicao ?? livroAtual.edicao,
            isbn: novosDados.isbn ?? livroAtual.isbn,
            categoria_id: novosDados.categoria_id ?? livroAtual.categoria_id
        };
        if (novosDados.isbn && novosDados.isbn !== livroAtual.isbn) {
            const isbnExistente = this.livroRepo.listarLivros().some(l => l.isbn === novosDados.isbn && l.id !== livroAtual.id);
            if (isbnExistente) {
                throw new Error("O novo ISBN já está em uso por outro livro.");
            }
        }
        if ((novosDados.autor && novosDados.autor !== livroAtual.autor) ||
            (novosDados.editora && novosDados.editora !== livroAtual.editora) ||
            (novosDados.edicao && novosDados.edicao !== livroAtual.edicao)) {
            const combinacaoDuplicada = this.livroRepo.listarLivros().some(l => l.autor === (novosDados.autor ?? livroAtual.autor) &&
                l.editora === (novosDados.editora ?? livroAtual.editora) &&
                l.edicao === (novosDados.edicao ?? livroAtual.edicao) &&
                l.id !== livroAtual.id);
            if (combinacaoDuplicada) {
                throw new Error("A nova combinação de autor, editora e edição já existe.");
            }
        }
        this.livroRepo.atualizarLivroPorIndex(index, livroAtualizado);
        return livroAtualizado;
    }
    detalhesLivro(isbn) {
        return this.livroRepo.buscarLivroPorIsbn(isbn);
    }
    listar() {
        return this.livroRepo.listarLivros();
    }
}
exports.LivroService = LivroService;
