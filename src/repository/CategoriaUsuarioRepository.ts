import { CategoriaUsuario } from "../model/CategoriaUsuario";

export class CategoriaUsuarioRepository {
    private static instance: CategoriaUsuarioRepository;
    private categoriaUsuarios: CategoriaUsuario[] = [];
    private idCounter = 1;

    private constructor() { }

    public static getInstance(): CategoriaUsuarioRepository {
        if (!this.instance) {
            this.instance = new CategoriaUsuarioRepository();
        }
        return this.instance;
    }


    listarUsuarios(): CategoriaUsuario[] {
        return this.categoriaUsuarios;
    }

}