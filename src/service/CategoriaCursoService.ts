import { CategoriaCursoRepository } from "../repository/CategoriaCursoRepository";
import { CategoriaCurso } from "../model/entity/CategoriaCurso";

export class CategoriaCursoService {
    private categoriaCursoRepository = CategoriaCursoRepository.getInstance();

     listarCursos(){
        return this.categoriaCursoRepository.listarCategorias();
    }
    
}
