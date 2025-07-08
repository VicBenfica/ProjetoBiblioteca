import { CategoriaLivro } from "../model/CategoriaLivro";
//importa o model
export class CategoriaLivroRepository {
    private static instance: CategoriaLivroRepository;
    //instance: padrão singleton, garante que só existe um instancia
    //do repositorio durante o funcionamento do progrma
    private categoriaLivros: CategoriaLivro[] = [];
    //Array que guarada a categoria dos livros

    private constructor() { }

    popularMock(): void {
        this.categoriaLivros = [
            new CategoriaLivro(1, "Romance"),
            new CategoriaLivro(2, "Computação"),
            new CategoriaLivro(3, "Letras"),
            new CategoriaLivro(4, "Gestão")
        ];
    }

    public static getInstance(): CategoriaLivroRepository {
        if (!this.instance) {
            this.instance = new CategoriaLivroRepository();
        }
        //criação de instancia
        return this.instance;
    }


    listarLivros(): CategoriaLivro[] {
        return this.categoriaLivros;
    }
    buscarPorId(id: number): CategoriaLivro | undefined {
        return this.categoriaLivros.find(l => l.id === id);
    }

}