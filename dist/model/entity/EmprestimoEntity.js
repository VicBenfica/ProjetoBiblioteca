"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoEntity = void 0;
class EmprestimoEntity {
    constructor(cpfUsuario, codigoExemplar) {
        this.id = EmprestimoEntity.proximoId++;
        this.cpfUsuario = cpfUsuario;
        this.codigoExemplar = codigoExemplar;
        this.dataEmprestimo = new Date();
    }
}
exports.EmprestimoEntity = EmprestimoEntity;
EmprestimoEntity.proximoId = 1;
