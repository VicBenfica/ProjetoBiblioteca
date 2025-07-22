"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueEntity = void 0;
class EstoqueEntity {
    constructor(codigo, livro_isbn, quantidade, quantidade_emprestada, status // opcional
    ) {
        this.codigo = codigo;
        this.livro_isbn = livro_isbn;
        this.quantidade = quantidade;
        this.quantidade_emprestada = quantidade_emprestada;
        // Se o status for passado, usa ele. Caso contrário, calcula automaticamente.
        this.status = status ?? (quantidade_emprestada < quantidade ? 'disponivel' : 'emprestado');
    }
}
exports.EstoqueEntity = EstoqueEntity;
