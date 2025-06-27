import { Request, Response } from "express";
import { CategoriaCursoService } from "../service/CategoriaCursoService";
// O controller tem que chamar o arquivo do service
export class CategoriaCursoController {
    private categoriaCursoService = new CategoriaCursoService()
    //private pois só pode ser acessada dentro do categoria curso, cria um objeto, intancia da classe
    //CategoriaCursoService

    listar(req: Request, res: Response): void {
        //req: representa a requisição HTTP
        //Res: representa a resposta HTTP
        try {
            const categoria = this.categoriaCursoService.listarCategorias()
            res.status(201).json(categoria)
            //201 - DEU CERTO!
        } catch (error: unknown) {
            let message: string = "Não foi possível listar!!"
            //mensagem padrão de erro
            if (error instanceof Error) {
                message = error.message
                //sunstitui a mensagem pela que veio da exceção
            }
            res.status(400).json({
                message: message
                //deu erro
            });
        }
    }


}

//Chama a service para buscar todas as categorias de curso.

//Retorna essas categorias via JSON na resposta.

//Caso algo dê errado, retorna um erro 400 com uma mensagem explicativa.