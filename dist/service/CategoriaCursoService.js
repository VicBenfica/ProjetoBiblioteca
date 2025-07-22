"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaCursoService = void 0;
const CategoriaCursoRepository_1 = require("../repository/CategoriaCursoRepository");
class CategoriaCursoService {
    constructor() {
        this.categoriaCursoRepository = CategoriaCursoRepository_1.CategoriaCursoRepository.getInstance();
    }
    async listarCursos() {
        return await this.categoriaCursoRepository.listarCategorias();
    }
}
exports.CategoriaCursoService = CategoriaCursoService;
