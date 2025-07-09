"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroController = void 0;
const CategoriaLivroService_1 = require("../service/CategoriaLivroService");
class CategoriaLivroController {
    categoriaLivroService = new CategoriaLivroService_1.CategoriaLivroService();
    //cria um objeto da classe categoria LivroService, com isso ele pode acessar os metodos de serviço
    listar(req, res) {
        //get
        try {
            const categoria = this.categoriaLivroService.listarLivros();
            // a constante categoria chama o metodo listarLivros que lista os livros
            res.status(200).json(categoria);
            // se der certo mostra 201
        }
        catch (error) {
            let message = "Não foi possível listar!!";
            if (error instanceof Error) {
                message = error.message;
                //se tiver alguma instancia de erro, mostra
            }
            res.status(400).json({
                message: message
                //se não, mostra a mensagem
            });
        }
    }
}
exports.CategoriaLivroController = CategoriaLivroController;
