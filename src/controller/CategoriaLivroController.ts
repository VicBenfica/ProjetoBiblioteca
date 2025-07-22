
import { CategoriaLivroService } from "../service/CategoriaLivroService";
import { Request, Response } from "express";
import { LivroService } from "../service/LivroService";

export class CategoriaLivroController{
    private categoriaLivroService = new LivroService();

    listarLivro(req: Request, res: Response): void{
        try{
            const lista = this.categoriaLivroService.listarLivros();
            res.status(200).json(lista);
        } catch(error: unknown){
           let message = "Não conseguimos realizar a listagem de livros";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            })
        }
    }
}