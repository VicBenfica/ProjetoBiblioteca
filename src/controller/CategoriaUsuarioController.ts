import { Request, Response } from "express";
import { CategoriaUsuarioService } from "../service/CategoriaUsuarioService";


export class CategoriaUsuarioController {
    private categoriaUsuarioService = new CategoriaUsuarioService()

    listar(req: Request, res: Response): void {
        try {
            const categoria = this.categoriaUsuarioService.listar()
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