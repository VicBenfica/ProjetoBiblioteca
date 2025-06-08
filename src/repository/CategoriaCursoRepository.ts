import { CategoriaCurso } from "../model/CategoriaCurso";

export class CategoriaCursoRepository {
    private static instance: CategoriaCursoRepository;
    private cursos: CategoriaCurso[] = [];

    private constructor() { }

    public static getInstance(): CategoriaCursoRepository {
        if (!this.instance) {
            this.instance = new CategoriaCursoRepository();
        }
        return this.instance;
    }


    listarCursos(): CategoriaCurso[] {
        return this.cursos;
    }

}