import { Emprestimo } from "../model/Emprestimo";

export class EmprestimoRepository {
    private static instance: EmprestimoRepository;
    private emprestimos: Emprestimo[] = [];

    private constructor() {}

    public static getInstance(): EmprestimoRepository{
        if(!this.instance){
            this.instance = new EmprestimoRepository();
        }

        return this.instance;
    }

    insereEmprestimo(emprestimo: Emprestimo){
        this.emprestimos.push(emprestimo);
    }

    listarEmprestimos(){
        return this.emprestimos;
    }

    filtraEmprestimoPorID(id: number){
        return this.emprestimos.find(emprestimo => emprestimo.id === id);
    }

    filtraEmprestimosAtivosDoUsuario(usuario: number){
        return this.emprestimos.filter(
            emprestimo => emprestimo.usuario === usuario && emprestimo.status === 'ativo'
        );
    }

    filtraEmprestimosAtrasadosDoUsuario(cpf: number): Emprestimo[]{
        return this.emprestimos.filter(
            emprestimo => emprestimo.usuario === cpf && emprestimo.status === 'ativo' && emprestimo.estaAtrasado()
        );
    }

    emprestimosAtivosDoUsuario(cpf: number): number {
        return this.filtraEmprestimosAtivosDoUsuario(cpf).length;
    }

    verificarUsuarioSuspenso(cpf: number): boolean{
        const emprestimosAtrasados = this.filtraEmprestimosAtrasadosDoUsuario(cpf);
        return emprestimosAtrasados.some(emprestimo => emprestimo.calcularDiasAtraso() > 60);
    }

    atualizarStatusEmprestimo(id: number, novoStatus: 'ativo' | 'devolvido' | 'atrasado'): void{
        const emprestimo = this.filtraEmprestimoPorID(id);

        if(emprestimo){
            emprestimo.status = novoStatus;

            if(novoStatus === 'devolvido'){
                emprestimo.finalizarEmprestimo();
            }
        }
    }

    verificarLimiteEmprestimo(cpf: number, categoria: 'professor' | 'aluno'): boolean{
        const emprestimosAtivos = this.emprestimosAtivosDoUsuario(cpf);
        let limiteEmprestimos = 0;

        if(categoria === 'professor'){
            limiteEmprestimos = 5;
        } else {
            limiteEmprestimos = 3;
        }

        return emprestimosAtivos < limiteEmprestimos;
    }

    listarEmprestimosAtivos(){
        return this.emprestimos.filter(
            emprestimo => emprestimo.status === 'ativo'
        );
    }
}