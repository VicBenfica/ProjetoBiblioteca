import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";
import { CategoriaLivro } from "../model/entity/CategoriaLivro";

export class CategoriaLivroService{
    private categoriaLivroRepository = CategoriaLivroRepository.getInstance();

      listarLivros(){
        return this.categoriaLivroRepository.listarCategoriasLivro();
    }
}