import { Livro }  from "../model/Livro";
import { Estoque }  from "../model/Estoque";

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

  insereLivro(livro: Livro) {
    this.livros.push(livro);
  }

  listarLivros(): Livro[] {
    return this.livros;
  }

  buscarIndexPorId(id: number): number {
    return this.livros.findIndex(l => l.id === id);
  }

  buscarLivroPorId(id: number): Livro | undefined {
    return this.livros.find(l => l.id === id);
  }

  removerLivroPorIndex(index: number): void {
    this.livros.splice(index, 1);
  }

  atualizarLivroPorIndex(index: number, livroAtualizado: Livro): void {
    this.livros[index] = livroAtualizado;
  }
}
