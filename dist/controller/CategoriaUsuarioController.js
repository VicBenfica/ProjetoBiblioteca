"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioController = void 0;
const CategoriaUsuarioService_1 = require("../service/CategoriaUsuarioService");
class CategoriaUsuarioController {
    categoriaUsuarioService = new CategoriaUsuarioService_1.CategoriaUsuarioService();
    listarCategoriaUsuario(req, res) {
        try {
            const lista = this.categoriaUsuarioService.listarCategorias();
            res.status(200).json(lista);
        }
        catch (error) {
            let message = "Não conseguimos realizar a listagem de categoria de usuarios";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
}
exports.CategoriaUsuarioController = CategoriaUsuarioController;
