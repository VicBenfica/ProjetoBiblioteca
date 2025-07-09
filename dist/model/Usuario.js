"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
// src/model/Usuario.ts
class Usuario {
    id;
    nome;
    cpf;
    // email?: string; // Se você quiser email, adicione aqui e no construtor
    categoria_id;
    curso_id;
    ativo;
    diaSuspensao;
    suspensao_ate;
    // CONSTRUTOR: Deve corresponder exatamente às propriedades que você quer no objeto
    constructor(id, nome, cpf, categoria_id, curso_id) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.ativo = 'ativo'; // Definido fixo como 'ativo' aqui
        this.curso_id = curso_id;
        this.categoria_id = categoria_id;
        this.suspensao_ate = null;
    }
}
exports.Usuario = Usuario;
