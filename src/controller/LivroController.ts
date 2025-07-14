import { LivroService } from "../service/LivroService";
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { Livro } from "../model/dto/LivroDto";

@Route("livro")
@Tags("Livro")
export class LivroController extends Controller {
    livroService = new LivroService();

    @Post()
    async criarLivro(
        @Body() dto: Livro,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            dto.isbn = String(dto.isbn);
            const livro = await this.livroService.adicionarLivro(dto);
            return success(201, new BasicResponseDto("Livro cadastrado com sucesso!", livro));
        } catch (err: any) {
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }

    @Get()
    async listarLivros(
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<202, BasicResponseDto>
    ): Promise<void> {
        try {
            const livros = await this.livroService.listarLivroComFiltro({});
            return success(202, new BasicResponseDto("Livros Cadastrados: ", livros));
        } catch (err: any) {
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }

    @Get("{isbn}")
    async filtrarLivro(
        @Path() isbn: string,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<Livro> {
        try {
            const livroEncontrado = await this.livroService.buscarLivroPorISBN(isbn);
            return success(200, new BasicResponseDto("Livro encontrado com sucesso!", livroEncontrado));
        } catch (err: any) {
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }

    @Put("{isbn}")
    async atualizarLivro(
        @Path() isbn: string,
        @Body() dto: Livro,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            dto.isbn = String(dto.isbn);
            const livroAtualizado = await this.livroService.atualizarLivro(isbn, dto);

            return success(200, new BasicResponseDto("Livro atualizado com sucesso!", livroAtualizado));
        } catch (err: any) {
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }

    @Delete("{isbn}")
    async removerLivro(
        @Path() isbn: string,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ) {
        try {
            const livroRemovido = await this.livroService.removerLivro(isbn);
            return success(200, new BasicResponseDto("Livro Removido com sucesso!", livroRemovido));
        } catch (err: any) {
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }

}