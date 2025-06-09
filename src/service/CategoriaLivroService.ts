
import { CategoriaLivro } from "../model/CategoriaLivro";
import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";

export class CategoriaLivroService {
    categoriaLivroRepository = CategoriaLivroRepository.getInstance();

    listarLivros() {
        return this.categoriaLivroRepository.listarLivros();
    }
    buscarCategorias(id: number) {
        return this.categoriaLivroRepository.buscarPorId(id);
    }
}