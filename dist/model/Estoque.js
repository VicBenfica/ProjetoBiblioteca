"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estoque = void 0;
class Estoque {
    static ultimoId = 0;
    isbn;
    cod;
    quantidade;
    quantidade_emprestada;
    disponibilidade;
    constructor(isbn, quantidade, quantidade_emprestada) {
        if (!isbn || !quantidade) {
            throw new Error("Por favor informar todos os campos");
        }
        this.isbn = isbn;
        this.cod = this.gerarId();
        this.quantidade = quantidade;
        this.quantidade_emprestada = quantidade_emprestada;
        this.disponibilidade = 'disponivel';
    }
    gerarId() {
        Estoque.ultimoId++;
        return Estoque.ultimoId;
    }
}
exports.Estoque = Estoque;
