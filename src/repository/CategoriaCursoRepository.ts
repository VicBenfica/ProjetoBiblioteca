import { CategoriaCurso } from "../model/CategoriaCurso";
//importa o model

export class CursoRepository{
    private static instance: CursoRepository;
    private cursos: CategoriaCurso[] = [];

    private constructor() {
        this.cursos.push(new CategoriaCurso("ADS"));
        this.cursos.push(new CategoriaCurso("Pedagogia"));
        this.cursos.push(new CategoriaCurso("Administração"));
    };
    
    public static getInstance(): CursoRepository{
        if(!this.instance){
            this.instance = new CursoRepository();
        }
    
        return this.instance;
    }

    listarCursos(){
        return this.cursos;
    }

    encontrarCurso(cur: string){
        return this.cursos.find(curso => curso.nome === cur);
    }
}