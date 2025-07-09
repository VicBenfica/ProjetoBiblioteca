"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioRepository = void 0;
const CategoriaUsuario_1 = require("../model/CategoriaUsuario");
class CategoriaUsuarioRepository {
    static instance;
    categoriaUsuarios = [];
    //armazena todas as categorias em um array
    idCounter = 1;
    //usado para gerar id unicos, nesse cod n é usado mas em outros sim
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaUsuarioRepository();
        } //ve se exisite uma instanci, se não, ceia e retorna
        return this.instance;
    }
    popularMock() {
        this.categoriaUsuarios = [
            new CategoriaUsuario_1.CategoriaUsuario(1, "aluno"),
            new CategoriaUsuario_1.CategoriaUsuario(2, "professor"),
            new CategoriaUsuario_1.CategoriaUsuario(3, "bibliotecario")
        ];
        console.log("Usuarios Mock populados:", this.categoriaUsuarios);
    }
    listarUsuarios() {
        return this.categoriaUsuarios;
    }
    buscarPorId(id) {
        return this.categoriaUsuarios.find(c => c.id === id);
    }
}
exports.CategoriaUsuarioRepository = CategoriaUsuarioRepository;
