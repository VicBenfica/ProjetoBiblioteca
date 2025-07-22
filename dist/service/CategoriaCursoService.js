"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoService = void 0;
const CategoriaCursoRepository_1 = require("../repository/CategoriaCursoRepository");
class CursoService {
    cursoRepository = CategoriaCursoRepository_1.CursoRepository.getInstance();
    listarCursos() {
        return this.cursoRepository.listarCursos();
    }
}
exports.CursoService = CursoService;
