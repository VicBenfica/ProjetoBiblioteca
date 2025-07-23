import { CategoriaCursoService } from "../service/CategoriaCursoService";
import { Controller, Get, Res, Route, Tags, TsoaResponse } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
//importa a DTO que será usada para padronizar a API

@Route("categoria-cursos")
//Define as rotas
@Tags("Cursos Disponiveis")

export class CategoriaCursoController extends Controller{
    categoriaCursoService = new CategoriaCursoService();

    @Get()
    async listarCurso(
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
        try{
            const lista = await this.categoriaCursoService.listarCursos();
            return success(200, new BasicResponseDto("Cursos Disponiveis: ", lista));
        } catch(err: any){
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }
}