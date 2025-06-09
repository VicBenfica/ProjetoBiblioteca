"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaCursoRepository = void 0;
class CategoriaCursoRepository {
    static instance;
    categoriaCursos = [];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaCursoRepository();
        }
        return this.instance;
    }
    listarCursos() {
        return this.categoriaCursos;
    }
    buscarPorId(id) {
        return this.categoriaCursos.find(c => c.id === id);
    }
}
exports.CategoriaCursoRepository = CategoriaCursoRepository;
