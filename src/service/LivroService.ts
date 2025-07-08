import { Livro } from "../model/Livro";
import { Estoque } from "../model/Estoque";
import { LivroRepository } from "../repository/LivroRepository";

type DadosAtualizacaoLivro = {
    id?: number;
    titulo?: string;
    autor?: string;
    editora?: string;
    edicao?: string;
    isbn?: string;
    categoria_id?: number;
};

export class LivroService {
    private livroRepo = LivroRepository.getInstance();

    private idCounter = 1; // contador local
    //cria exemplar novo de um livro
    novoLivro(data: any): Livro {
        // Validação de campos obrigatórios
        if (!data.titulo || !data.isbn || !data.autor || !data.editora || !data.edicao || !data.categoria_id) {
            throw new Error("Favor informar título, ISBN, autor, editora, edição e categoria.");
        }

        // Verificação de ISBN duplicado
        const isbnExistente = this.livroRepo.listarLivros().some(l => l.isbn === data.isbn);
        if (isbnExistente) {
            throw new Error("Já existe um livro com esse ISBN.");
        }

        // Verificação de combinação duplicada (autor + editora + edição)
        const combinacaoDuplicada = this.livroRepo.listarLivros().some(l =>
            l.autor === data.autor &&
            l.editora === data.editora &&
            l.edicao === data.edicao
        );
        if (combinacaoDuplicada) {
            throw new Error("Já existe um livro com esse autor, editora e edição.");
        }

        // Criação do livro - CORREÇÃO DA ORDEM DOS PARÂMETROS
        const livro = new Livro(
            this.idCounter++,   // 1. id
            data.titulo,       // 2. titulo
            data.autor,        // 3. autor (correto)
            data.editora,      // 4. editora (correto)
            data.edicao,       // 5. edicao (correto)
            data.isbn,         // 6. isbn (correto)
            data.categoria_id  // 7. categoria_id (correto)
        );

            // Inserção no repositório
            this.livroRepo.insereLivro(livro);

        return livro;
    }


    //remove exemplar, verifica se esta emprestado antes de excluir
    removeLivro(id: number, estoque: Estoque[]): boolean {
        // Verifica se existe algum exemplar emprestado
        const emprestado = estoque.some(e => e.livro_id === id && e.quantidade_emprestada > 0);

        if (emprestado) {
            console.log("Não é possível remover: o livro possui exemplares emprestados.");
            return false;
        }

        // Usar buscarIndexPorId, conforme definido no LivroRepository
        const index = this.livroRepo.buscarIndexPorId(id);
        if (index === -1) {
            console.log("Livro não encontrado.");
            return false;
        }

        this.livroRepo.removerLivroPorIndex(index);
        console.log("Livro removido com sucesso.");
        return true;
    }

    atualizarLivro(id: number, novosDados: DadosAtualizacaoLivro): Livro | undefined {
        // Usar buscarIndexPorId
        const index = this.livroRepo.buscarIndexPorId(id);
        if (index === -1) return undefined;

        // Usar buscarLivroPorId
        const livroAtual = this.livroRepo.buscarLivroPorId(id)!;

        const livroAtualizado: Livro = {
            id: novosDados.id ?? livroAtual.id,
            titulo: novosDados.titulo ?? livroAtual.titulo,
            autor: novosDados.autor ?? livroAtual.autor,
            editora: novosDados.editora ?? livroAtual.editora,
            edicao: novosDados.edicao ?? livroAtual.edicao,
            isbn: novosDados.isbn ?? livroAtual.isbn,
            categoria_id: novosDados.categoria_id ?? livroAtual.categoria_id
        };
        this.livroRepo.atualizarLivroPorIndex(index, livroAtualizado);
        return livroAtualizado;
    }

     detalhesLivro(isbn: string): Livro | undefined { // Agora espera um ISBN (string)
        return this.livroRepo.buscarLivroPorIsbn(isbn); // Chama o novo método do repositório
    }

    // O método listar no LivroService está recebendo um 'id' mas não o utiliza.
    // Se a intenção é listar todos os livros, o parâmetro 'id' é desnecessário.
    // Se a intenção é listar um livro específico, o nome do método deveria ser 'buscarLivro' ou similar.
    listar() { // Removido o parâmetro 'id' se a intenção é listar todos
        return this.livroRepo.listarLivros();
    }
}