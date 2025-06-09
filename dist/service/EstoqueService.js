"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueService = void 0;
const Estoque_1 = require("../model/Estoque");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
class EstoqueService {
    estoqueRepo = EstoqueRepository_1.EstoqueRepository.getInstance();
    NovoExemplar(dados) {
        // Validação
        if (dados.id === undefined ||
            dados.livro_id === undefined ||
            dados.quantidade === undefined ||
            dados.quantidade_emprestada === undefined ||
            dados.disponivel === undefined) {
            throw new Error("Todos os campos são obrigatórios.");
        }
        if (typeof dados.id !== "number" || dados.id <= 0) {
            throw new Error("ID inválido.");
        }
        if (dados.quantidade < 1) {
            throw new Error("A quantidade deve ser pelo menos 1.");
        }
        if (dados.quantidade_emprestada < 0) {
            throw new Error("A quantidade emprestada não pode ser negativa.");
        }
        if (dados.quantidade_emprestada > dados.quantidade) {
            throw new Error("A quantidade emprestada não pode exceder a quantidade total.");
        }
        const exemplar = new Estoque_1.Estoque(dados.id, dados.livro_id, dados.quantidade, dados.quantidade_emprestada, dados.disponivel);
        this.estoqueRepo.insereExemplar(exemplar);
        return exemplar;
    }
    detalhesExemplar(id) {
        return this.estoqueRepo.buscarPorId(id);
    }
    atualizarDisponibilidadeExemplar(id, disponivel) {
        const index = this.estoqueRepo.buscarIndexPorId(id);
        if (index === -1) {
            console.log("Exemplar não encontrado.");
            return false;
        }
        this.estoqueRepo.atualizarDisponibilidadePorId(id, disponivel);
        return true;
    }
    removeExemplar(id, estoque) {
        // Verifica se existe algum exemplar emprestado
        const emprestado = estoque.some(e => e.livro_id === id && e.quantidade_emprestada > 0);
        if (emprestado) {
            console.log("Não é possível remover: o exemplar está emprestado.");
            return false;
        }
        const index = this.estoqueRepo.buscarIndexPorId(id);
        if (index === -1) {
            console.log("Exemplar não encontrado.");
            return false;
        }
        this.estoqueRepo.removerExemplarPorIndex(index);
        console.log("Exemplar removido com sucesso.");
        return true;
    }
    listarDisponiveis() {
        return this.estoqueRepo.listarExemplaresDisponiveis();
    }
    listar() {
        return this.estoqueRepo.listarEstoques();
    }
}
exports.EstoqueService = EstoqueService;
