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


}
