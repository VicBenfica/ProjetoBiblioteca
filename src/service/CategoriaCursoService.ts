import { CategoriaCursoRepository } from "../repository/CategoriaCursoRepository";

export class CursoService{
    cursoRepository = CategoriaCursoRepository.getInstance();

    listarCursos(){
        return this.cursoRepository.listarCategorias();
    }

    buscarPorId(id: number){
        return this.cursoRepository.buscarPorId(id);
    }
}