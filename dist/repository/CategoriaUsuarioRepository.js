"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioRepository = void 0;
class CategoriaUsuarioRepository {
    static instance;
    categoriaUsuarios = [];
    idCounter = 1;
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaUsuarioRepository();
        }
        return this.instance;
    }
    listarUsuarios() {
        return this.categoriaUsuarios;
    }
    buscarPorId(id) {
        return this.categoriaUsuarios.find(c => c.id === id);
    }
}
exports.CategoriaUsuarioRepository = CategoriaUsuarioRepository;
