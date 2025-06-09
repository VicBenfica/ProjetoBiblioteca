"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoRepository = void 0;
class EmprestimoRepository {
    static instance;
    emprestimos = [];
    idCounter = 1;
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EmprestimoRepository();
        }
        return this.instance;
    }
    gerarNovoId() {
        return this.idCounter++;
    }
    //Listar
    listarEmprestimos() {
        return this.emprestimos;
    }
    buscarPorId(id) {
        return this.emprestimos.find(e => e.id === id);
    }
    //Registrar
    salvarEmprestimo(emprestimo) {
        this.emprestimos.push(emprestimo);
    }
    //Registrar devolucao
    atualizarEmprestimo(emprestimo) {
        const index = this.emprestimos.findIndex(e => e.id === emprestimo.id);
        if (index !== -1) {
            this.emprestimos[index] = emprestimo;
        }
    }
}
exports.EmprestimoRepository = EmprestimoRepository;
