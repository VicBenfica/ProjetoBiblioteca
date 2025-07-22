"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueRepository = void 0;
const mysql_1 = require("../database/mysql");
const EstoqueEntity_1 = require("../model/entity/EstoqueEntity");
class EstoqueRepository {
    constructor() {
        this.exemplares = [];
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EstoqueRepository();
        }
        return this.instance;
    }
    async inserirExemplar(exemplar) {
        const query = `
        INSERT INTO biblioteca.Estoque (livro_isbn, quantidade, quantidade_emprestada, status)
        VALUES (?, ?, ?, ?)`;
        const valores = [
            exemplar.livro_isbn,
            exemplar.quantidade,
            exemplar.quantidade_emprestada,
            exemplar.status
        ];
        const resultado = await (0, mysql_1.executarComandoSQL)(query, valores);
        // Retorna exemplar com ID gerado
        return new EstoqueEntity_1.EstoqueEntity(resultado.insertId, exemplar.livro_isbn, exemplar.quantidade, exemplar.quantidade_emprestada, exemplar.status);
    }
    async buscarPorISBN(isbn) {
        const query = `SELECT * FROM biblioteca.Estoque WHERE livro_isbn = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [isbn]);
        if (!resultado || resultado.length === 0)
            return [];
        return resultado.map((row) => new EstoqueEntity_1.EstoqueEntity(row.codigo, row.livro_isbn, row.quantidade, row.quantidade_emprestada, row.status));
    }
    buscarPorCodigo(codigo) {
        return this.exemplares.find(exemplar => exemplar.codigo === codigo);
    }
    listarEstoque() {
        return this.exemplares;
    }
    atualizarStatus(codigo, status) {
        const exemplar = this.buscarPorCodigo(codigo);
        if (!exemplar)
            return false;
        exemplar.status = status;
        return true;
    }
    remover(codigo) {
        const index = this.exemplares.findIndex(e => e.codigo === codigo);
        if (index === -1)
            return false;
        this.exemplares.splice(index, 1);
        return true;
    }
}
exports.EstoqueRepository = EstoqueRepository;
