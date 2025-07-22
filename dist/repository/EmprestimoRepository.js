"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoRepository = void 0;
class EmprestimoRepository {
    static instance;
    emprestimos = [];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EmprestimoRepository();
        }
        return this.instance;
    }
    insereEmprestimo(emprestimo) {
        this.emprestimos.push(emprestimo);
    }
    listarEmprestimos() {
        return this.emprestimos;
    }
    filtraEmprestimoPorID(id) {
        return this.emprestimos.find(emprestimo => emprestimo.id === id);
    }
    filtraEmprestimosAtivosDoUsuario(usuario) {
        return this.emprestimos.filter(emprestimo => emprestimo.usuario === usuario && emprestimo.status === 'ativo');
    }
    filtraEmprestimosAtrasadosDoUsuario(cpf) {
        return this.emprestimos.filter(emprestimo => emprestimo.usuario === cpf && emprestimo.status === 'ativo' && emprestimo.estaAtrasado());
    }
    emprestimosAtivosDoUsuario(cpf) {
        return this.filtraEmprestimosAtivosDoUsuario(cpf).length;
    }
    verificarUsuarioSuspenso(cpf) {
        const emprestimosAtrasados = this.filtraEmprestimosAtrasadosDoUsuario(cpf);
        return emprestimosAtrasados.some(emprestimo => emprestimo.calcularDiasAtraso() > 60);
    }
    atualizarStatusEmprestimo(id, novoStatus) {
        const emprestimo = this.filtraEmprestimoPorID(id);
        if (emprestimo) {
            emprestimo.status = novoStatus;
            if (novoStatus === 'devolvido') {
                emprestimo.finalizarEmprestimo();
            }
        }
    }
    verificarLimiteEmprestimo(cpf, categoria) {
        const emprestimosAtivos = this.emprestimosAtivosDoUsuario(cpf);
        let limiteEmprestimos = 0;
        if (categoria === 'professor') {
            limiteEmprestimos = 5;
        }
        else {
            limiteEmprestimos = 3;
        }
        return emprestimosAtivos < limiteEmprestimos;
    }
    listarEmprestimosAtivos() {
        return this.emprestimos.filter(emprestimo => emprestimo.status === 'ativo');
    }
}
exports.EmprestimoRepository = EmprestimoRepository;
