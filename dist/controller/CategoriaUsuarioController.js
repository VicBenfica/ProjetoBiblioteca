"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioController = void 0;
//Request e Response: são objetos do Express usados para capturar e responder requisições HTTP.
const CategoriaUsuarioService_1 = require("../service/CategoriaUsuarioService");
class CategoriaUsuarioController {
    categoriaUsuarioService = new CategoriaUsuarioService_1.CategoriaUsuarioService();
    listar(req, res) {
        try {
            const categoria = this.categoriaUsuarioService.listar();
            res.status(200).json(categoria);
            //retorna os usuario em fotmato JSON 
        }
        catch (error) {
            let message = "Não foi possível listar!!";
            if (error instanceof Error) {
                message = error.message;
                //se o erro tiver uma instancia, mostra
            }
            res.status(400).json({
                message: message
                // se não, mostra o erro combiando;
            });
        }
    }
}
exports.CategoriaUsuarioController = CategoriaUsuarioController;
