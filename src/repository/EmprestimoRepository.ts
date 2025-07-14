import { EmprestimoEntity } from "../model/entity/EmprestimoEntity";

export class EmprestimoRepository {
    private static instance: EmprestimoRepository;
    private emprestimos: EmprestimoEntity[] = [];

    private constructor() {}

    public static getInstance(): EmprestimoRepository {
        if (!this.instance) {
        this.instance = new EmprestimoRepository();
    }
    return this.instance;
    }

    inserir(emprestimo: EmprestimoEntity): void {
        this.emprestimos.push(emprestimo);
    }

    listarEmprestimos(): EmprestimoEntity[] {
        return this.emprestimos;
    }

    buscarEmprestimoPorId(id: number): EmprestimoEntity | undefined {
        return this.emprestimos.find(e => e.id === id);
    }

    registrarDevolucao(id: number, data: Date): boolean {
        const emprestimo = this.buscarEmprestimoPorId(id);
        if (emprestimo && !emprestimo.dataEntrega) {
            emprestimo.dataEntrega = data;
            return true;
    }
        return false;
    }

    listarPorUsuario(cpf: string): EmprestimoEntity[] {
        return this.emprestimos.filter(e => e.cpfUsuario === cpf);
    }

    emprestimosAbertos(cpf: string): EmprestimoEntity[] {
        return this.emprestimos.filter(e => e.cpfUsuario === cpf && !e.dataEntrega);
    }
}