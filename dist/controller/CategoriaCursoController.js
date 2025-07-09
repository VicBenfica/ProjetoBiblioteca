"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaCursoController = void 0;
const CategoriaCursoService_1 = require("../service/CategoriaCursoService");
// O controller tem que chamar o arquivo do service
class CategoriaCursoController {
    categoriaCursoService = new CategoriaCursoService_1.CategoriaCursoService();
    //private pois só pode ser acessada dentro do categoria curso, cria um objeto, intancia da classe
    //CategoriaCursoService
    listar(req, res) {
        //req: representa a requisição HTTP
        //Res: representa a resposta HTTP
        try {
            const categoria = this.categoriaCursoService.listarCategorias();
            res.status(200).json(categoria);
            //201 - DEU CERTO!
        }
        catch (error) {
            let message = "Não foi possível listar!!";
            //mensagem padrão de erro
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
                //deu erro
            });
        }
    }
}
exports.CategoriaCursoController = CategoriaCursoController;
