import { CategoriaLivro } from "../model/CategoriaLivro";

export class CategoriaLivroRepository {
    private static instance: CategoriaLivroRepository;
    private categoriaLivros: CategoriaLivro[] = [];
    

    private constructor() { }

    public static getInstance(): CategoriaLivroRepository {
        if (!this.instance) {
            this.instance = new CategoriaLivroRepository();
        }
        return this.instance;
    }


    listarLivros(): CategoriaLivro[] {
        return this.categoriaLivros;
    }

}