
export class Usuario {
    id: number;
    nome?: string;
    cpf?: string;

    categoria_id: number;
    //conecta com categoria Usuario
    curso_id: number;
    //conecta com categoriaCurso
    ativo: 'ativo' | 'inativo' | 'suspenso';
    diaSuspensao?: number;
    //Quantos dias o usuário ficará suspenso (após atraso na devolução)
    suspensao_ate?: Date | null;



    constructor(id: number, nome: string, cpf: string, ativo: string, categoria_id: number, curso_id: number) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.ativo = 'ativo';
        this.curso_id = curso_id;
        this.categoria_id = categoria_id;
        this.suspensao_ate = null;
        //pq o usuario ainda n foi suspenso, 
    }
}

//valida se o cpf é valiso, colocque aqui para quando for colocado o cpf ja valida altomaticamente

export class Validador {
    static validarCPFCompleto(cpf: string): boolean {
        // Remove caracteres não numéricos
        cpf = cpf.replace(/\D/g, '');
        //substitui todas as strings que não são números por " " -> tira

        // Verifica se tem exatamente 11 dígitos
        if (cpf.length !== 11) {
            return false;
        }

        // Verificação manual: se todos os dígitos são iguais
        const primeiroDigito = cpf.charAt(0);
        //charAt(pegar strings por ordem)
        let todosIguais = true;
        for (let i = 1; i < cpf.length; i++) {
            if (cpf.charAt(i) !== primeiroDigito) {
                todosIguais = false;
                break;
            }
        }
        if (todosIguais) return false;

        // Cálculo do primeiro dígito verificador
        const primeiroDigitoCalculado = this.calcularDigitoVerificador(cpf.substring(0, 9), 10);
        //pega os primeiros 9 digitos, e 10 é o peso inicial,É usado no cálculo do primeiro dígito.

        if (primeiroDigitoCalculado !== parseInt(cpf.charAt(9))) {
            //Se o dígito verificador calculado for diferente do dígito real, o CPF é inválido e a função retorna false.
            return false;
        }

        // Cálculo do segundo dígito verificador
        const segundoDigitoCalculado = this.calcularDigitoVerificador(cpf.substring(0, 10), 11);
        if (segundoDigitoCalculado !== parseInt(cpf.charAt(10))) {
            //vefica se é igual a q esta no cpf
            return false;
        }

        return true;
    }

    static calcularDigitoVerificador(cpfParcial: string, pesoInicial: number): number {
        //cpfParcial: os primeiros dígitos do CPF (9 ou 10, dependendo se for o primeiro ou segundo dígito verificador).
        //pesoInicial: número que indica com qual peso a multiplicação começa (10 para o primeiro dígito, 11 para o segundo).
        let soma = 0;
        for (let i = 0; i < cpfParcial.length; i++) {
            soma += parseInt(cpfParcial.charAt(i)) * (pesoInicial - i);
            //Ex: 1×10 + 2×9 + 3×8 + ... + 9×2

        }

        const resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
    }
}
