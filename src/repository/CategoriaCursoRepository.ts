import { CategoriaCurso } from "../model/CategoriaCurso";
//importa o model

export class CategoriaCursoRepository {
    private static instance: CategoriaCursoRepository;
    private categoriaCursos: CategoriaCurso[] = [];
    //armazena todos os cursos no categoriaCursos

    private constructor() { }

    public static getInstance(): CategoriaCursoRepository {
        //método para acessar a unica instancia da classe
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
        //se encontrar retorna a categoria se não retorna undefined
    }


}