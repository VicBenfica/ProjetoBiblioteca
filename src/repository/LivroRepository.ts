import { Livro }  from "../model/Livro";

export class LivroRepository {
    private static instance: LivroRepository;
    private livros: Livro[] = [];


    private constructor() {}

    public static getInstance(): LivroRepository {
        if (!this.instance) {
        this.instance = new LivroRepository();
    }
    return this.instance;
    }
}