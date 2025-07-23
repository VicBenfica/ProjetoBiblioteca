"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaCursoRepository = void 0;
const CategoriaCurso_1 = require("../model/entity/CategoriaCurso");
const mysql_1 = require("../database/mysql");
class CategoriaCursoRepository {
    constructor() {
        this.criarTable();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaCursoRepository;
            this.inserirCategoriasPadrao();
        }
        return this.instance;
    }
    async criarTable() {
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.CategoriaCurso(
        id INT AUTO_INCREMENT PRIMARY KEY, 
        nome VARCHAR(100) NOT NULL
        )`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log('Tabela de categoria de cursos criada!', resultado);
        }
        catch (err) {
            console.error('Erro ao executar a query:', err);
        }
    }
    static async inserirCategoriasPadrao() {
        const categorias = ["ADS", "Pedagogia", "Administração"];
        await (0, mysql_1.executarComandoSQL)("CREATE TABLE IF NOT EXISTS biblioteca.CategoriaCurso (id INT AUTO_INCREMENT PRIMARY KEY, nome VARCHAR(100) NOT NULL)", []);
        for (const nome of categorias) {
            try {
                const resultado = await (0, mysql_1.executarComandoSQL)("INSERT IGNORE INTO biblioteca.CategoriaCurso (nome) VALUES (?)", [nome]);
                console.log('Categoria criada com sucesso:', resultado);
            }
            catch (err) {
                console.error('Erro ao criar categoria:', err);
            }
        }
    }
    async listarCategorias() {
        const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM biblioteca.CategoriaCurso", []);
        const categorias = [];
        if (resultado && resultado.length > 0) {
            for (let i = 0; i < resultado.length; i++) {
                const row = resultado[i];
                categorias.push(new CategoriaCurso_1.CategoriaCurso(row.id, row.nome));
            }
        }
        return categorias;
    }
    async encontrarCategoria(categoria) {
        const query = `SELECT * FROM biblioteca.CategoriaCurso WHERE nome = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [categoria]);
        if (resultado && resultado.length > 0) {
            const row = resultado[0];
            return new CategoriaCurso_1.CategoriaCurso(row.id, row.nome);
        }
        return null;
    }
}
exports.CategoriaCursoRepository = CategoriaCursoRepository;
