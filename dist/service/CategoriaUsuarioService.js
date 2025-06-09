"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioService = void 0;
const CategoriaUsuarioRepository_1 = require("../repository/CategoriaUsuarioRepository");
class CategoriaUsuarioService {
    categoriaUsuarioRepository = CategoriaUsuarioRepository_1.CategoriaUsuarioRepository.getInstance();
    listar() {
        return this.categoriaUsuarioRepository.listarUsuarios();
    }
    buscarCategorias(id) {
        return this.categoriaUsuarioRepository.buscarPorId(id);
    }
}
exports.CategoriaUsuarioService = CategoriaUsuarioService;
