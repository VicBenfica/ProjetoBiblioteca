import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";
import { CategoriaUsuario } from "../model/entity/CategoriaUsuario";

export class CategoriaUsuarioService {
    private categoriaUsuarioRepository = CategoriaUsuarioRepository.getInstance();

     listarUsuarios(){
        return this.categoriaUsuarioRepository.listarCategoria();
    }
}
