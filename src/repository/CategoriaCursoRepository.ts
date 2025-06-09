import { CategoriaCurso } from "../model/CategoriaCurso";

export class CategoriaCursoRepository {
    private static instance: CategoriaCursoRepository;
    private categoriaCursos: CategoriaCurso[] = [];

    private constructor() { }

    public static getInstance(): CategoriaCursoRepository {
        if (!this.instance) {
            this.instance = new CategoriaCursoRepository();
        }
        return this.instance;
    }


    listarCursos(): CategoriaCurso[] {
        return this.categoriaCursos;
    }
    buscarPorId(id: number): CategoriaCurso | undefined {
        return this.categoriaCursos.find(c => c.id === id);
    }


}