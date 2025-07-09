"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaCursoService = void 0;
const CategoriaCursoRepository_1 = require("../repository/CategoriaCursoRepository");
class CategoriaCursoService {
    categoriaCursoRepository = CategoriaCursoRepository_1.CategoriaCursoRepository.getInstance();
    listarCategorias() {
        return this.categoriaCursoRepository.listarCursos();
    }
    //retorna todos os cursos cadastrados
    buscarCategorias(id) {
        return this.categoriaCursoRepository.buscarPorId(id);
        //busca o curso por id
    }
}
exports.CategoriaCursoService = CategoriaCursoService;
