import { CategoriaUsuario } from "../model/CategoriaUsuario";

export class CategoriaUsuarioRepository {
    private static instance: CategoriaUsuarioRepository;
    private categoriaUsuarios: CategoriaUsuario[] = [];
    //armazena todas as categorias em um array
    private idCounter = 1;
    //usado para gerar id unicos, nesse cod n é usado mas em outros sim

    private constructor() { }

    public static getInstance(): CategoriaUsuarioRepository {
        if (!this.instance) {
            this.instance = new CategoriaUsuarioRepository();
        }//ve se exisite uma instanci, se não, ceia e retorna
        return this.instance;
    }
    popularMock(): void {
        this.categoriaUsuarios = [
            new CategoriaUsuario(1, "aluno"),
            new CategoriaUsuario(2, "professor"),
            new CategoriaUsuario(3, "bibliotecario")
        ];
    }


    listarUsuarios(): CategoriaUsuario[] {
        return this.categoriaUsuarios;
    }

    buscarPorId(id: number): CategoriaUsuario | undefined {
        return this.categoriaUsuarios.find(c => c.id === id);
    }

}