"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroRepository = void 0;
class LivroRepository {
    static instance;
    livros = [];
    static getInstance() {
        if (!this.instance) {
            this.instance = new LivroRepository();
        }
        return this.instance;
    }
    insereLivro(livro) {
        this.livros.push(livro);
    }
    atualizarLivroPorIndex(index, livroAtualizado) {
        this.livros[index] = livroAtualizado;
    }
    removerLivroPorIndex(index) {
        this.livros.splice(index, 1);
    }
    listarLivros() {
        return this.livros;
    }
    buscarIndexPorId(id) {
        return this.livros.findIndex(l => l.id === id);
    }
    buscarPorId(id) {
        return this.livros.find(l => l.id === id);
    } //Busca os detalhes 
    buscarLivroPorIsbn(isbn) {
        return this.livros.find(l => l.isbn === isbn);
    }
}
exports.LivroRepository = LivroRepository;
