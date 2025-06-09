"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaCursoService = void 0;
const CategoriaCursoRepository_1 = require("../repository/CategoriaCursoRepository");
class CategoriaCursoService {
    categoriaCursoRepository = CategoriaCursoRepository_1.CategoriaCursoRepository.getInstance();
    listarCategorias() {
        return this.categoriaCursoRepository.listarCursos();
    }
    buscarCategorias(id) {
        return this.categoriaCursoRepository.buscarPorId(id);
    }
}
exports.CategoriaCursoService = CategoriaCursoService;
