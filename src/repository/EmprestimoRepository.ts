import { Emprestimo } from "../model/Emprestimo";

export class EmprestimoRepository {
  private static instance: EmprestimoRepository;
  private emprestimos: Emprestimo[] = [];
  private idCounter = 1;

  private constructor() {}

  public static getInstance(): EmprestimoRepository {
    if (!this.instance) {
      this.instance = new EmprestimoRepository();
    }
    return this.instance;
  }

  gerarNovoId(): number {
    return this.idCounter++;
  }
//Registrar
  salvarEmprestimo(emprestimo: Emprestimo): void {
    this.emprestimos.push(emprestimo);
  }
//Listar
  listarEmprestimos(): Emprestimo[] {
    return this.emprestimos;
  }

  buscarPorId(id: number): Emprestimo | undefined {
    return this.emprestimos.find(e => e.id === id);
  }
//Registrar devolucao
  atualizarEmprestimo(emprestimo: Emprestimo): void {
    const index = this.emprestimos.findIndex(e => e.id === emprestimo.id);
    if (index !== -1) {
      this.emprestimos[index] = emprestimo;
    }
  }
}
