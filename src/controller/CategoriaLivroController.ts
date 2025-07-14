import { CategoriaLivroService } from "../service/CategoriaLivroService";
import { Request, Response } from "express";
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";


@Route("categoria-livros")
@Tags("Categoria de Livro")

export class CategoriaLivroController {
    categoriaLivroService = new CategoriaLivroService();
    @Get()
    async listarCategoriaLivro(
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const lista = await this.categoriaLivroService.listarCategorias();
            return success(200, new BasicResponseDto("Categorias de Livro Disponiveis", lista));
        } catch (err: any) {
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }
}