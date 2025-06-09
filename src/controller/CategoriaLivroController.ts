import { Request, Response } from "express";
import { CategoriaLivroService } from "../service/CategoriaLivroService";


export class CategoriaLivroController {
    private categoriaLivroService = new CategoriaLivroService()

    listar(req: Request, res: Response): void {
        try {
            const categoria = this.categoriaLivroService.listarLivros()
            res.status(201).json(categoria)
        } catch (error: unknown) {
            let message: string = "Não foi possível listar!!"
            if (error instanceof Error) {
                message = error.message
            }
            res.status(400).json({
                message: message
            });
        }
    }

}