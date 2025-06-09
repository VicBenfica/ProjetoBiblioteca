"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estoque = void 0;
class Estoque {
    id; //codigo
    livro_id; //isbn
    quantidade;
    quantidade_emprestada;
    disponivel;
    constructor(id, livro_id, quantidade, quantidade_emprestada, disponivel) {
        this.id = id;
        this.livro_id = livro_id;
        this.quantidade = quantidade;
        this.quantidade_emprestada = quantidade_emprestada;
        this.disponivel = disponivel;
    }
}
exports.Estoque = Estoque;
