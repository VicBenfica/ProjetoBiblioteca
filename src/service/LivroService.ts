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

  removeLivro(id: number, estoque: Estoque[]): boolean {
    // Verifica se existe algum exemplar emprestado
    const emprestado = estoque.some(e => e.livro_id === id && e.quantidade_emprestada > 0);

    if (emprestado) {
      console.log("Não é possível remover: o livro possui exemplares emprestados.");
      return false;
    }

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
    const index = this.livroRepo.buscarIndexPorId(id);
    if (index === -1) return undefined;

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

  detalhesLivro(id: number): Livro | undefined {
    return this.livroRepo.buscarLivroPorId(id);
  }
}
