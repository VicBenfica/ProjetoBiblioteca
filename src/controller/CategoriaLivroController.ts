import { Request, Response } from "express";
import { CategoriaLivroService } from "../service/CategoriaLivroService";


export class CategoriaLivroController {
    private categoriaLivroService = new CategoriaLivroService()
    //cria um objeto da classe categoria LivroService, com isso ele pode acessar os metodos de serviço


    listar(req: Request, res: Response): void {
        //get
        try {
            const categoria = this.categoriaLivroService.listarLivros()
            // a constante categoria chama o metodo listarLivros que lista os livros
            res.status(201).json(categoria)
            // se der certo mostra 201
        } catch (error: unknown) {
            let message: string = "Não foi possível listar!!"
            if (error instanceof Error) {
                message = error.message
                //se tiver alguma instancia de erro, mostra
            }
            res.status(400).json({
                message: message
                //se não, mostra a mensagem
            });
        }
    }

}