"use strict";
// src/repository/EstoqueRepository.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueRepository = void 0;
class EstoqueRepository {
    static instance;
    exemplares = []; // ALTERADO: de 'estoques' para 'exemplares'
    codigoCounter = 1; // Contador para gerar 'codigo' único
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EstoqueRepository();
        }
        return this.instance;
    }
    // NOVO MÉTODO: para gerar um novo código de exemplar
    gerarNovoCodigo() {
        return this.codigoCounter++;
    }
    inserirExemplar(exemplar) {
        this.exemplares.push(exemplar);
    }
    // ALTERADO: Buscar exemplar por código (antigo buscarPorId)
    buscarPorCodigo(codigo) {
        return this.exemplares.find(e => e.codigo === codigo);
    }
    // NOVO MÉTODO: Atualizar status de um exemplar por código
    atualizarStatus(codigo, status) {
        const exemplar = this.buscarPorCodigo(codigo);
        if (exemplar) {
            exemplar.status = status;
            // Não é necessário chamar `atualizarEstoque` aqui se a modificação for direta na referência
        }
    }
    // ALTERADO: Atualizar exemplar completo (reintroduzido para atualizações gerais)
    atualizarEstoque(exemplarAtualizado) {
        const index = this.exemplares.findIndex(e => e.codigo === exemplarAtualizado.codigo);
        if (index !== -1) {
            this.exemplares[index] = exemplarAtualizado;
        }
    }
    // REMOVIDO: removerExemplarPorIndex (agora usaremos um método 'remover' mais direto)
    // ALTERADO: Listar exemplares com status 'disponivel'
    listarExemplaresDisponiveis() {
        return this.exemplares.filter(estoque => estoque.status === 'disponivel');
    }
    // ALTERADO: Listar todos os exemplares (renomeado de listarEstoques)
    listarEstoque() {
        return this.exemplares;
    }
    // NOVO MÉTODO: Remover exemplar por código (mais direto)
    remover(codigo) {
        const index = this.exemplares.findIndex(e => e.codigo === codigo);
        if (index === -1)
            return false;
        this.exemplares.splice(index, 1);
        return true;
    }
}
exports.EstoqueRepository = EstoqueRepository;
