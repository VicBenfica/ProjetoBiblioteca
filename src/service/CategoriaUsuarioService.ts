import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";

export class CategoriaUsuarioService{
    categoriaUsuRepository = CategoriaUsuarioRepository.getInstance();

    listarCategorias(){
        return this.categoriaUsuRepository.listarCategoria();
    }
}