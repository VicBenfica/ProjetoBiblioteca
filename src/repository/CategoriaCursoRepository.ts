import { CategoriaCurso } from "../model/CategoriaCurso";
//importa o model

export class CursoRepository{
    private static instance: CursoRepository;
    private cursos: CategoriaCurso[] = [
        new CategoriaCurso(0, "Não se Aplica"),
        new CategoriaCurso(1, "ADS"),
        new CategoriaCurso(2, "Pedagogia"),
        new CategoriaCurso(3, "Administração")
    ];

    private constructor(){}

    public static getInstance(): CursoRepository {
        if(!this.instance){
            this.instance = new CursoRepository;
        }
        return this.instance;
    }

    listarCursos(): CategoriaCurso[]{
            return this.cursos;
        }
    
        buscarPorId(id: number): CategoriaCurso | undefined{
            return this.cursos.find(curso => curso.id === id);
        }
    }