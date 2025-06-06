import { Emprestimo }  from "../model/Emprestimo";

export class EmprestimoRepository {
    private static instance: EmprestimoRepository;
    private emprestimos: Emprestimo[] = [];
    private idCounter: number = 1; 

    private constructor() {}

    public static getInstance(): EmprestimoRepository {
        if (!this.instance) {
            this.instance = new EmprestimoRepository();
        }
        return this.instance;
    }

    inserirEmprestimo(cpf: string, codigo: string): Emprestimo {
  const novo = new Emprestimo(
    this.idCounter++,
    Number(cpf),               // usuario_id 
    Number(codigo),            // estoque_id 
    new Date(),                // data_emprestimo
    new Date(),                // data_devolucao 
    new Date(),                // data_entrega 
    0,                         // dias_atraso
    new Date()                 // suspensao_ate 
    );
    this.emprestimos.push(novo);
    return novo;
    }

    listarEmprestimos(): Emprestimo[] {
    return this.emprestimos;
    }


    registrarDevolucao(id: number): Emprestimo | undefined {
    const emprestimo = this.emprestimos.find(e => e.id === id);

    if (!emprestimo) {
        console.log("Empréstimo não encontrado.");
        return undefined;
    }

    const agora = new Date();
    emprestimo.data_entrega = agora;

    const diffTime = agora.getTime() - emprestimo.data_devolucao.getTime();
    const diasAtraso = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    emprestimo.dias_atraso = diasAtraso;

    if (diasAtraso > 0) {
        const suspensao = new Date();
        suspensao.setDate(suspensao.getDate() + diasAtraso * 3);
        emprestimo.suspensao_ate = suspensao;
    } else {
        emprestimo.suspensao_ate = emprestimo.data_entrega; 
    }

    return emprestimo;
    }

    //FILTRAR id, usuario ativo, usuario atrasado, exemplar ativo, verificar usuario suspenso

}
