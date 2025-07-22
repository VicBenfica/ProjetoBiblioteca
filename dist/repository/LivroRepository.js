"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroRepository = void 0;
class LivroRepository {
    static instance;
    livros = [];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new LivroRepository();
        }
        return this.instance;
    }
    inserirLivro(livro) {
        this.livros.push(livro);
    }
    validacaoISBN(isbn) {
        return isbn.toString().length === 13;
    }
    filtraLivroPorISBN(isbn) {
        return this.livros.find(livro => livro.isbn === isbn);
    }
    validacaoLivro(isbn) {
        return this.filtraLivroPorISBN(isbn) !== undefined;
    }
    removeLivroPorISBN(isbn) {
        const index = this.findIndex(isbn);
        return this.livros.splice(index, 1);
    }
    atualizarLivroPorISBN(isbn, novosDados) {
        const index = this.findIndex(isbn);
        const livro = this.livros[index];
        if (novosDados.titulo) {
            livro.titulo = novosDados.titulo;
        }
        if (novosDados.autor) {
            livro.autor = novosDados.autor;
        }
        if (novosDados.editora) {
            livro.editora = novosDados.editora;
        }
        if (novosDados.edicao) {
            livro.edicao = novosDados.edicao;
        }
        if (novosDados.categoria) {
            livro.categoria = novosDados.categoria;
        }
        if (novosDados.status) {
            livro.status = novosDados.status;
        }
        this.livros[index] = livro;
        return livro;
    }
    listarLivros() {
        return this.livros;
    }
    findIndex(isbn) {
        const index = this.livros.findIndex(livro => livro.isbn == isbn);
        if (index == -1) {
            throw new Error("ISBN informado não foi encontrado!");
        }
        return index;
    }
}
exports.LivroRepository = LivroRepository;
