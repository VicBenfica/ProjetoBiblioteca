"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioRepository = void 0;
const CategoriaUsuario_1 = require("../model/entity/CategoriaUsuario");
const mysql_1 = require("../database/mysql");
class CategoriaUsuarioRepository {
    constructor() {
        this.criarTable();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaUsuarioRepository;
        }
        return this.instance;
    }
    imprimeResult(err, result) {
        if (result != undefined) {
            console.log("Dentro callback", result);
        }
    }
    async criarTable() {
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.CategoriaUsuario(
                id INT AUTO_INCREMENT PRIMARY KEY, 
                nome VARCHAR(100) NOT NULL
                )`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log('Tabela de categoria de usuarios criada!', resultado);
        }
        catch (err) {
            console.error('Erro ao executar a query:', err);
        }
    }
    async inserirCategoriasPadrao() {
        const categorias = ["Professor", "Aluno", "Bibliotecário"];
        await (0, mysql_1.executarComandoSQL)("CREATE TABLE IF NOT EXISTS biblioteca.CategoriaUsuario (id INT AUTO_INCREMENT PRIMARY KEY, nome VARCHAR(100) NOT NULL)", []);
        for (const nome of categorias) {
            try {
                const resultado = await (0, mysql_1.executarComandoSQL)("INSERT IGNORE INTO biblioteca.CategoriaUsuario (nome) VALUES (?)", [nome]);
                console.log('Categoria criada com sucesso:', resultado);
            }
            catch (err) {
                console.error('Erro ao criar categoria:', err);
            }
        }
    }
    async listarCategorias() {
        const categorias = [];
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM biblioteca.CategoriaUsuario", []);
            for (let i = 0; i < resultado.length; i++) {
                const dados = resultado[i];
                const categoria = new CategoriaUsuario_1.CategoriaUsuario(dados.id, dados.nome);
                categorias.push(categoria);
            }
            return categorias;
        }
        catch (err) {
            console.error('Erro ao listar categorias:', err);
            return [];
        }
    }
    async buscarPorId(id) {
        const query = `SELECT * FROM biblioteca.CategoriaLivro WHERE id = ?`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, [id]);
            if (resultado && resultado.length > 0) {
                const dados = resultado[0];
                return new CategoriaUsuario_1.CategoriaUsuario(dados.id, dados.nome);
            }
            return null;
        }
        catch (err) {
            console.error("Erro ao buscar categoria por ID:", err);
            return null;
        }
    }
}
exports.CategoriaUsuarioRepository = CategoriaUsuarioRepository;
