"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validador = exports.Usuario = void 0;
class Usuario {
    id;
    nome;
    cpf;
    categoria_id;
    curso_id;
    ativo;
    diaSuspensao;
    suspensao_ate;
    constructor(id, nome, cpf, ativo, categoria_id, curso_id) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.ativo = 'ativo';
        this.curso_id = curso_id;
        this.categoria_id = categoria_id;
        this.suspensao_ate = null;
    }
}
exports.Usuario = Usuario;
class Validador {
    static validarCPFCompleto(cpf) {
        // Remove caracteres não numéricos
        cpf = cpf.replace(/\D/g, '');
        // Verifica se tem exatamente 11 dígitos
        if (cpf.length !== 11) {
            return false;
        }
        // Verificação manual: se todos os dígitos são iguais
        const primeiroDigito = cpf.charAt(0);
        let todosIguais = true;
        for (let i = 1; i < cpf.length; i++) {
            if (cpf.charAt(i) !== primeiroDigito) {
                todosIguais = false;
                break;
            }
        }
        if (todosIguais)
            return false;
        // Cálculo do primeiro dígito verificador
        const primeiroDigitoCalculado = this.calcularDigitoVerificador(cpf.substring(0, 9), 10);
        if (primeiroDigitoCalculado !== parseInt(cpf.charAt(9))) {
            return false;
        }
        // Cálculo do segundo dígito verificador
        const segundoDigitoCalculado = this.calcularDigitoVerificador(cpf.substring(0, 10), 11);
        if (segundoDigitoCalculado !== parseInt(cpf.charAt(10))) {
            return false;
        }
        return true;
    }
    static calcularDigitoVerificador(cpfParcial, pesoInicial) {
        let soma = 0;
        for (let i = 0; i < cpfParcial.length; i++) {
            soma += parseInt(cpfParcial.charAt(i)) * (pesoInicial - i);
        }
        const resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
    }
}
exports.Validador = Validador;
