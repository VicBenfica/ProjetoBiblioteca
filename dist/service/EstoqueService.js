"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueService = void 0;
const EstoqueEntity_1 = require("../model/entity/EstoqueEntity");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const LivroRepository_1 = require("../repository/LivroRepository");
class EstoqueService {
    constructor() {
        this.estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
        this.livroRepository = LivroRepository_1.LivroRepository.getInstance();
    }
    async cadastrarExemplar(codigo, livro_isbn) {
        if (!codigo || !livro_isbn) {
            throw new Error("ISBN e código do livro são obrigatórios!");
        }
        const livro = await this.livroRepository.buscarLivroPorISBN(livro_isbn);
        if (!livro) {
            throw new Error("Livro não encontrado.");
        }
        const existente = await this.estoqueRepository.buscarPorCodigo(codigo);
        if (existente) {
            throw new Error("Código já utilizado. Tente novamente.");
        }
        const novoExemplar = new EstoqueEntity_1.EstoqueEntity(codigo, livro_isbn, 1, 0, "disponivel");
        return await this.estoqueRepository.inserirExemplar(novoExemplar);
    }
    async listarDisponiveis() {
        const todos = await this.estoqueRepository.listarEstoque();
        return todos.filter(e => e.status === "disponivel");
    }
    async buscarExemplar(codigo) {
        const exemplar = await this.estoqueRepository.buscarPorCodigo(codigo);
        if (!exemplar) {
            throw new Error("Exemplar não encontrado.");
        }
        return exemplar;
    }
    async atualizarStatus(codigo, status) {
        const exemplar = await this.buscarExemplar(codigo);
        if (exemplar.status === status)
            return exemplar;
        await this.estoqueRepository.atualizarStatus(codigo, status);
        return await this.buscarExemplar(codigo);
    }
    async marcarComoEmprestado(codigo) {
        const exemplar = await this.buscarExemplar(codigo);
        if (exemplar.status !== "disponivel") {
            throw new Error("Exemplar não está disponível para empréstimo.");
        }
        await this.estoqueRepository.atualizarStatus(codigo, "emprestado");
    }
    async marcarComoDisponivel(codigo) {
        await this.estoqueRepository.atualizarStatus(codigo, "disponivel");
    }
    async existeExemplarDoLivro(isbn) {
        const exemplares = await this.estoqueRepository.buscarPorISBN(isbn) || [];
        return exemplares.length > 0;
    }
    async getResumoEstoque(isbn) {
        const exemplares = await this.estoqueRepository.buscarPorISBN(isbn) || [];
        return {
            total: exemplares.length,
            disponiveis: exemplares.filter(e => e.status === "disponivel").length
        };
    }
    async removerExemplar(codigo) {
        // Verifica se o exemplar existe
        const exemplar = await this.estoqueRepository.buscarPorCodigo(codigo);
        if (!exemplar) {
            throw new Error("Exemplar não encontrado.");
        }
        if (exemplar.status === "emprestado") {
            throw new Error("Exemplar não pode ser removido, pois está emprestado.");
        }
        await this.estoqueRepository.remover(codigo);
    }
}
exports.EstoqueService = EstoqueService;
