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
        //usa o id para gerar novos ids
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
        //posição dentro do array que qr atualizar
        if (index !== -1) {
            //Se achou, quando não acha é -1
            this.emprestimos[index] = emprestimo;
            //substitui pelo novo emprestimo
        }
    }
}
exports.EmprestimoRepository = EmprestimoRepository;
