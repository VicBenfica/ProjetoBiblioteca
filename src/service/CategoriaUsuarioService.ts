
import { CategoriaUsuario } from "../model/CategoriaUsuario";
import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";

export class CategoriaUsuarioService {
    categoriaUsuarioRepository = CategoriaUsuarioRepository.getInstance();

    listar() {
        return this.categoriaUsuarioRepository.listarUsuarios();
    }
    buscarCategorias(id: number) {
        return this.categoriaUsuarioRepository.buscarPorId(id);
    }
}