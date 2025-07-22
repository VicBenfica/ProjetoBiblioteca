"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emprestimo = void 0;
class Emprestimo {
    constructor(cpfUsuario, codigoExemplar) {
        this.id = Emprestimo.proximoId++;
        this.cpfUsuario = cpfUsuario;
        this.codigoExemplar = codigoExemplar;
        this.dataEmprestimo = new Date();
    }
}
exports.Emprestimo = Emprestimo;
Emprestimo.proximoId = 1;
