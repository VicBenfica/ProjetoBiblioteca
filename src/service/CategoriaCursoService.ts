
import { CategoriaCurso } from "../model/CategoriaCurso";
import { CategoriaCursoRepository } from "../repository/CategoriaCursoRepository";

export class CategoriaCursoService {
    categoriaCursoRepository = CategoriaCursoRepository.getInstance();

    listarCategorias() {
        return this.categoriaCursoRepository.listarCursos();
    }
    //retorna todos os cursos cadastrados
    buscarCategorias(id: number) {
        return this.categoriaCursoRepository.buscarPorId(id);
    //busca o curso por id
    }

}