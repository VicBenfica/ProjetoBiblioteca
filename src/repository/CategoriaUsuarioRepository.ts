import { CategoriaUsuario } from "../model/CategoriaUsuario";

export class CategoriaUsuarioRepository{
    private static instance: CategoriaUsuarioRepository;
    private categorias: CategoriaUsuario[] = [];

   private constructor() {
        this.categorias.push(new CategoriaUsuario("Aluno"));
        this.categorias.push(new CategoriaUsuario("Professor"));
        this.categorias.push(new CategoriaUsuario("Bibliotecario"));
    };

    public static getInstance(): CategoriaUsuarioRepository{
        if(!this.instance){
            this.instance = new CategoriaUsuarioRepository();
        }

        return this.instance;
    }

    listarCategoria(){
        return this.categorias;
    }

    encontrarCategoria(cat: string){
        return this.categorias.find(categoria => categoria.nome === cat)
    }
}