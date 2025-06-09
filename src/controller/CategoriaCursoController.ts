import { Request, Response } from "express";
import { CategoriaCursoService } from "../service/CategoriaCursoService";

export class CategoriaCursoController {
    private categoriaCursoService = new CategoriaCursoService()

    listar(req: Request, res: Response): void {
        try {
            const categoria = this.categoriaCursoService.listarCategorias()
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