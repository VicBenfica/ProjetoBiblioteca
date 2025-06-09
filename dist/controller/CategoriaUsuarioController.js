"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioController = void 0;
const CategoriaUsuarioService_1 = require("../service/CategoriaUsuarioService");
class CategoriaUsuarioController {
    categoriaUsuarioService = new CategoriaUsuarioService_1.CategoriaUsuarioService();
    listar(req, res) {
        try {
            const categoria = this.categoriaUsuarioService.listar();
            res.status(201).json(categoria);
        }
        catch (error) {
            let message = "Não foi possível listar!!";
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
