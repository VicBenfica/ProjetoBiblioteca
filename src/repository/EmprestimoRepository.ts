import { Emprestimo } from "../model/Emprestimo";

export class EmprestimoRepository {
    private static instance: EmprestimoRepository;
    private emprestimos: Emprestimo[] = [];
    private idCounter = 1;

    private constructor() { }

    public static getInstance(): EmprestimoRepository {
        if (!this.instance) {
            this.instance = new EmprestimoRepository();
        }
        return this.instance;
    }

    gerarNovoId(): number {
        return this.idCounter++;
        //usa o id para gerar novos ids
    }

    //Listar
    listarEmprestimos(): Emprestimo[] {
        return this.emprestimos;
    }

    buscarPorId(id: number): Emprestimo | undefined {
        return this.emprestimos.find(e => e.id === id);
    }


    //Registrar
    salvarEmprestimo(emprestimo: Emprestimo): void {
        this.emprestimos.push(emprestimo);
    }
    //Registrar devolucao
    atualizarEmprestimo(emprestimo: Emprestimo): void {
        const index = this.emprestimos.findIndex(e => e.id === emprestimo.id);
        //posição dentro do array que qr atualizar
        if (index !== -1) {
            //Se achou, quando não acha é -1
            this.emprestimos[index] = emprestimo;
            //substitui pelo novo emprestimo
        }
    }
    //O usuário devolve o livro

    //É preciso registrar a data da entrega

    //Calcular o atraso e a suspensão

    //Marcar o empréstimo como concluído
}
