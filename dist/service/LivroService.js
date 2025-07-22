"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroService = void 0;
const LivroEntity_1 = require("../model/entity/LivroEntity");
const LivroRepository_1 = require("../repository/LivroRepository");
const CategoriaLivroService_1 = require("./CategoriaLivroService");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository");
const EstoqueService_1 = require("./EstoqueService");
class LivroService {
    constructor() {
        this.livroRepository = LivroRepository_1.LivroRepository.getInstance();
        this.categoriaService = new CategoriaLivroService_1.CategoriaLivroService();
        this.estoqueService = new EstoqueService_1.EstoqueService();
        this.estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
        this.emprestimoRepository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
    }
    async adicionarLivro(livroData) {
        const { isbn, titulo, autor, editora, edicao, categoriaId } = livroData;
        if (!isbn || !titulo || !autor || !editora || !edicao || !categoriaId) {
            throw new Error("Informações incompletas para cadastrar livro.");
        }
        const categoria = await this.categoriaService.buscarPorId(categoriaId);
        if (!categoria) {
            throw new Error("Categoria inválida!");
        }
        const existente = await this.livroRepository.buscarLivroPorISBN(isbn);
        if (existente) {
            throw new Error("Livro com esse ISBN já existe!");
        }
        const livroDuplicado = await this.livroRepository.buscarLivroPorAutorEditoraEdicao(autor, editora, edicao);
        if (livroDuplicado) {
            throw new Error("Já existe um livro com este autor, editora e edição!");
        }
        const novoLivro = new LivroEntity_1.LivroEntity(isbn, titulo, autor, editora, edicao, categoriaId);
        return await this.livroRepository.insertLivro(novoLivro);
    }
    async listarLivroComFiltro(filtros) {
        const { isbn, titulo, autor, categoriaId } = filtros;
        const livros = await this.livroRepository.listarLivros();
        return livros.filter(livro => {
            const combinaISBN = isbn ? livro.isbn.toLowerCase().includes(isbn.toLowerCase()) : true;
            const combinaTitulo = titulo ? livro.titulo.toLowerCase().includes(titulo.toLowerCase()) : true;
            const combinaAutor = autor ? livro.autor.toLowerCase().includes(autor.toLowerCase()) : true;
            const combinaCatId = categoriaId ? livro.categoriaId === categoriaId : true;
            return combinaISBN && combinaTitulo && combinaAutor && combinaCatId;
        });
    }
    async buscarLivroPorISBN(isbn) {
        const livro = await this.livroRepository.buscarLivroPorISBN(isbn);
        if (!livro) {
            throw new Error("Livro não encontrado.");
        }
        return livro;
    }
    async atualizarLivro(isbn, novosDados) {
        const livro = await this.livroRepository.buscarLivroPorISBN(isbn);
        if (!livro) {
            throw new Error("Livro não encontrado!");
        }
        if (!novosDados.titulo &&
            !novosDados.autor &&
            !novosDados.editora &&
            !novosDados.edicao &&
            !novosDados.categoriaId) {
            throw new Error("Nenhum dado informado para atualização.");
        }
        if (novosDados.isbn && novosDados.isbn !== isbn) {
            throw new Error("Não é permitido alterar o ISBN do livro.");
        }
        if (novosDados.categoriaId) {
            const categoria = await this.categoriaService.buscarPorId(novosDados.categoriaId);
            if (!categoria) {
                throw new Error("Categoria Inválida!");
            }
        }
        const livroAtualizado = new LivroEntity_1.LivroEntity(livro.isbn, novosDados.titulo ?? livro.titulo, novosDados.autor ?? livro.autor, novosDados.editora ?? livro.editora, novosDados.edicao ?? livro.edicao, novosDados.categoriaId ?? livro.categoriaId);
        const livroFinal = await this.livroRepository.atualizarDadosLivro(livroAtualizado);
        if (!livroFinal) {
            throw new Error("Erro ao atualizar livro. Nenhuma linha foi afetada.");
        }
        return livroFinal;
    }
    async removerLivro(isbn) {
        const livro = await this.livroRepository.buscarLivroPorISBN(isbn);
        if (!livro) {
            throw new Error("Livro não encontrado.");
        }
        const exemplares = (await this.estoqueRepository.listarEstoque()).filter(e => e.livro_isbn === isbn);
        if (exemplares.length > 0) {
            throw new Error("Não é possível remover o livro: existem exemplares vinculados no estoque.");
        }
        const emprestimos = await this.emprestimoRepository.listarEmprestimos();
        const emprestimosAtivos = await Promise.all(emprestimos.map(async (e) => {
            const exemplar = await this.estoqueRepository.buscarPorCodigo(e.codigoExemplar);
            return exemplar && exemplar.livro_isbn === isbn && !e.dataEntrega;
        }));
        if (emprestimosAtivos.includes(true)) {
            throw new Error("Não é possível remover o livro: existem empréstimos ativos.");
        }
        const existeExemplar = await this.estoqueService.existeExemplarDoLivro(isbn);
        if (existeExemplar) {
            throw new Error("Não é possível remover o livro: existem exemplares vinculados.");
        }
        await this.livroRepository.removerLivro(isbn);
    }
}
exports.LivroService = LivroService;
