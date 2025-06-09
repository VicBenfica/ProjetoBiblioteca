
import { CategoriaCurso } from "../model/CategoriaCurso";
import { CategoriaCursoRepository } from "../repository/CategoriaCursoRepository";

export class CategoriaCursoService {
    categoriaCursoRepository = CategoriaCursoRepository.getInstance();

    listarCategorias() {
        return this.categoriaCursoRepository.listarCursos();
    }
    buscarCategorias(id: number) {
        return this.categoriaCursoRepository.buscarPorId(id);
    }

}