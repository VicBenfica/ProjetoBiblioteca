"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validador = void 0;
class Validador {
    static validarCPFCompleto(cpf) {
        cpf = cpf.replace(/\D/g, '');
        if (cpf.length !== 11)
            return false;
        // Verifica se todos os dígitos são iguais
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
        // Primeiro dígito verificador
        const digito1 = this.calcularDigitoVerificador(cpf.substring(0, 9), 10);
        if (digito1 !== parseInt(cpf.charAt(9)))
            return false;
        // Segundo dígito verificador
        const digito2 = this.calcularDigitoVerificador(cpf.substring(0, 10), 11);
        if (digito2 !== parseInt(cpf.charAt(10)))
            return false;
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
