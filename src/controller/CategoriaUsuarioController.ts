import { Request, Response } from "express";
//Request e Response: são objetos do Express usados para capturar e responder requisições HTTP.
import { CategoriaUsuarioService } from "../service/CategoriaUsuarioService";


export class CategoriaUsuarioController {
    private categoriaUsuarioService = new CategoriaUsuarioService()

    listar(req: Request, res: Response): void {
        try {
            const categoria = this.categoriaUsuarioService.listar()
            res.status(201).json(categoria)
            //retorna os usuario em fotmato JSON 
        } catch (error: unknown) {
            let message: string = "Não foi possível listar!!"
            if (error instanceof Error) {
                message = error.message
                //se o erro tiver uma instancia, mostra
            }
            res.status(400).json({
                message: message
                // se não, mostra o erro combiando;
            });
        }
    }

}