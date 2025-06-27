import { Livro } from "../model/Livro";
import { Estoque } from "../model/Estoque";

export class LivroRepository {
    private static instance: LivroRepository;
    //instancia
    private livros: Livro[] = [];
    //array


    public static getInstance(): LivroRepository {
        if (!this.instance) {
            this.instance = new LivroRepository();
        }
        return this.instance;
    }

    insereLivro(livro: Livro) {
        this.livros.push(livro);
    }
    atualizarLivroPorIndex(index: number, livroAtualizado: Livro): void {
        this.livros[index] = livroAtualizado;
        //atualizar por indice
    }


    removerLivroPorIndex(index: number): void {
        this.livros.splice(index, 1);
        //remove com base no indice
    }

    
     listarLivros(): Livro[] {
        return this.livros;
    }
    buscarIndexPorId(id: number): number {
        return this.livros.findIndex(l => l.id === id);
    }
    //, busca o INDICE com base no id
    buscarLivroPorId(id: number): Livro | undefined {
        return this.livros.find(l => l.id === id);
    }//Busca os detalhes




}
