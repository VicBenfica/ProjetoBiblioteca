"use strict";
// src/model/Emprestimo.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emprestimo = void 0;
class Emprestimo {
    id;
    usuario_id;
    estoque_codigo;
    data_emprestimo;
    data_devolucao;
    data_entrega;
    suspensao_ate;
    dias_atraso;
    constructor(id, usuario_id, estoque_codigo, data_emprestimo, data_devolucao, data_entrega, dias_atraso, suspensao_ate) {
        this.id = id;
        this.usuario_id = usuario_id;
        this.estoque_codigo = estoque_codigo; // ATRIBUIÇÃO ALTERADA
        this.data_emprestimo = data_emprestimo;
        this.data_devolucao = data_devolucao;
        this.data_entrega = data_entrega;
        this.dias_atraso = dias_atraso;
        this.suspensao_ate = suspensao_ate;
    }
}
exports.Emprestimo = Emprestimo;
