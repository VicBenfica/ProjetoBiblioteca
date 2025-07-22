"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioRepository = void 0;
const CategoriaUsuario_1 = require("../model/CategoriaUsuario");
class CategoriaUsuarioRepository {
    static instance;
    categorias = [];
    constructor() {
        this.categorias.push(new CategoriaUsuario_1.CategoriaUsuario("Aluno"));
        this.categorias.push(new CategoriaUsuario_1.CategoriaUsuario("Professor"));
        this.categorias.push(new CategoriaUsuario_1.CategoriaUsuario("Bibliotecario"));
    }
    ;
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaUsuarioRepository();
        }
        return this.instance;
    }
    listarCategoria() {
        return this.categorias;
    }
    encontrarCategoria(cat) {
        return this.categorias.find(categoria => categoria.nome === cat);
    }
}
exports.CategoriaUsuarioRepository = CategoriaUsuarioRepository;
