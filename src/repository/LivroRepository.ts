import { Livro } from "../model/Livro";
import { Estoque } from "../model/Estoque"; // Estoque é importado mas não usado diretamente aqui.

export class LivroRepository {
    private static instance: LivroRepository;
    private livros: Livro[] = [];

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
    }

    removerLivroPorIndex(index: number): void {
        this.livros.splice(index, 1);
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
    // NOVO MÉTODO: Buscar livro por ISBN
    buscarLivroPorIsbn(isbn: string): Livro | undefined {
        console.log("Buscando ISBN:", isbn); // Adicione esta linha
        const found = this.livros.find(l => {
            console.log("Comparando:", l.isbn, "com", isbn, "Resultado:", l.isbn === isbn); // Adicione esta linha
            return l.isbn === isbn;
        });
        console.log("Livro encontrado:", found); // Adicione esta linha
        return found;
    }
    
}