"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaCursoController = void 0;
const CategoriaCursoService_1 = require("../service/CategoriaCursoService");
class CategoriaCursoController {
    categoriaCursoService = new CategoriaCursoService_1.CategoriaCursoService();
    listar(req, res) {
        try {
            const categoria = this.categoriaCursoService.listarCategorias();
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
exports.CategoriaCursoController = CategoriaCursoController;
