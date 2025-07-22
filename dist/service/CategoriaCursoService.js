"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoService = void 0;
const CategoriaCursoRepository_1 = require("../repository/CategoriaCursoRepository");
class CursoService {
    constructor() {
        this.cursoRepository = CategoriaCursoRepository_1.CategoriaCursoRepository.getInstance();
    }
    listarCursos() {
        return this.cursoRepository.listarCategorias();
    }
    buscarPorId(id) {
        return this.cursoRepository.buscarPorId(id);
    }
}
exports.CursoService = CursoService;
