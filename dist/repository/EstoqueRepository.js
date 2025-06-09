"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueRepository = void 0;
class EstoqueRepository {
    static instance;
    estoques = [];
    idCounter = 1;
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EstoqueRepository();
        }
        return this.instance;
    }
    insereExemplar(exemplar) {
        this.estoques.push(exemplar);
    }
    buscarPorId(id) {
        return this.estoques.find(e => e.id === id);
    }
    atualizarDisponibilidadePorId(id, disponivel) {
        const index = this.buscarIndexPorId(id);
        if (index !== -1) {
            this.estoques[index].disponivel = disponivel;
        }
    }
    atualizarEstoque(exemplarAtualizado) {
        const index = this.estoques.findIndex(e => e.id === exemplarAtualizado.id);
        if (index !== -1) {
            this.estoques[index] = exemplarAtualizado;
        }
    }
    removerExemplarPorIndex(index) {
        this.estoques.splice(index, 1);
    }
    listarExemplaresDisponiveis() {
        return this.estoques.filter(estoque => estoque.disponivel);
    }
    listarEstoques() {
        return this.estoques;
    }
    gerarNovoId() {
        return this.idCounter++;
    }
    buscarIndexPorId(id) {
        return this.estoques.findIndex(e => e.id === id);
    }
}
exports.EstoqueRepository = EstoqueRepository;
