import { Livro } from "../model/Livro";
import { LivroRepository } from "../repository/LivroRepository";
import { CategoriaLivroService } from "./CategoriaLivroService";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { EstoqueService } from "./EstoqueService";
import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";

export class LivroService{
    private livroRepository = LivroRepository.getInstance();
    private categoriaLivroRepository = CategoriaLivroRepository.getInstance();
    private estoqueRepository = EstoqueRepository.getInstance();
    private emprestimoRepository = EmprestimoRepository.getInstance();

    novoLivro(data: any): Livro{
        if(!this.categoriaLivroRepository.encontrarCategoriaLivro(data.categoria)){
            throw new Error("Por favor informar uma categoria existente");
        }

        if(!this.livroRepository.validacaoISBN(data.isbn)){
            throw new Error("É necessário de 13 números obrigatorios da ISBN para cadastrar um livro!");
        }

        if(this.livroRepository.validacaoLivro(data.isbn)){
            throw new Error("Este livro já é cadastrado!");
        } else{
            const livro = new Livro(data.titulo, data.isbn, data.autor, data.editora, data.edicao, data.categoria);

            this.livroRepository.inserirLivro(livro);

            return livro;
        }
    }

    filtrarLivro(data: any){
        const isbn = data.isbn;
        return this.livroRepository.filtraLivroPorISBN(isbn);
    }

    removeLivro(isbn: number){
        const exemplares = this.estoqueRepository.listarEstoque().filter(e => e.isbn === isbn);
        for(const exemplar of exemplares){
            const emprestimosAtivoDoLivro = this.estoqueRepository.quantidadeLivrosEmprestados(exemplar.cod);
            if (emprestimosAtivoDoLivro) {
                throw new Error("Não é possível remover o livro: há exemplares emprestados!");
            }
        }
        return this.livroRepository.removeLivroPorISBN(isbn);
    }

    listarLivros(){
        return this.livroRepository.listarLivros();
    }

    atualizaLivro(data: any){
        const isbn = data.isbn;
        const novosDados = data.novosDados;

        return this.livroRepository.atualizarLivroPorISBN(isbn, novosDados);
    }


}