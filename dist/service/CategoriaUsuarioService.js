"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioService = void 0;
const CategoriaUsuarioRepository_1 = require("../repository/CategoriaUsuarioRepository");
class CategoriaUsuarioService {
    constructor() {
        this.categoriaUsuarioRepository = CategoriaUsuarioRepository_1.CategoriaUsuarioRepository.getInstance();
    }
    listarUsuarios() {
        return this.categoriaUsuarioRepository.listarCategoria();
    }
}
exports.CategoriaUsuarioService = CategoriaUsuarioService;
