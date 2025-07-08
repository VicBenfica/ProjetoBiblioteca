import { CursoRepository } from "../repository/CategoriaCursoRepository";

export class CursoService{
    cursoRepository = CursoRepository.getInstance();

    listarCursos(){
        return this.cursoRepository.listarCursos();
    }

    buscarPorId(id: number){
        return this.cursoRepository.buscarPorId(id);
    }
}