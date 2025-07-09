"use strict";
// src/model/Estoque.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estoque = void 0;
class Estoque {
    codigo; // Identificador único do exemplar
    livro_isbn; // Vínculo com o ISBN do livro
    quantidade; // Quantidade total de exemplares
    quantidade_emprestada; // Quantidade emprestada
    status; // Status de disponibilidade
    // Construtor atualizado para refletir as propriedades e o comportamento padrão do status
    constructor(codigo, livro_isbn, quantidade, quantidade_emprestada) {
        this.codigo = codigo;
        this.livro_isbn = livro_isbn;
        this.quantidade = quantidade;
        this.quantidade_emprestada = quantidade_emprestada;
        // O status inicial é 'disponivel' por padrão ao criar o objeto
        this.status = 'disponivel';
    }
}
exports.Estoque = Estoque;
