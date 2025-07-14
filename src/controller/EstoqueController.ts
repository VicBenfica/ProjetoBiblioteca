import { EstoqueService } from "../service/EstoqueService";
import { Request, Response } from "express";
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { Estoque } from "../model/dto/EstoqueDto";
import { Livro } from "../model/dto/LivroDto";

@Route("estoque")
@Tags("Estoque")
export class EstoqueController extends Controller {
    estoqueService = new EstoqueService();

    @Post()
    async adicionarLivroNoEstoque(
        @Body() dto: Livro,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const livro = await this.estoqueService.cadastrarExemplar(dto.id, dto.isbn);
            return success(200, new BasicResponseDto("Livro adicionado com sucesso!", livro));
        } catch (err: any) {
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }

    @Get()
    async listarEstoque(
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<202, BasicResponseDto>
    ): Promise<void> {
        try {
            const lista = await this.estoqueService.listarDisponiveis();
            return success(202, new BasicResponseDto("Lista do seu estoque: ", lista));
        } catch (err: any) {
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }

    @Get("{id}")
    async filtrarLivroNoEstoque(
        @Path() id: number,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const resultado = await this.estoqueService.buscarExemplar(Number(id));

            return success(200, new BasicResponseDto("Livro no estoque foi encontrado com sucesso!", resultado));
        } catch (err: any) {
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }

    @Put("{id}")
async atualizarDisponibilidade(
  @Path() id: number,
  @Body() dto: Partial<Estoque>,
  @Res() fail: TsoaResponse<400, BasicResponseDto>,
  @Res() success: TsoaResponse<200, BasicResponseDto>
): Promise<void> {
  try {
    if (!dto.status) {
      return fail(400, new BasicResponseDto("Campo 'status' é obrigatório.", undefined));
    }

    const disponibilidadeAtualizada = this.estoqueService.atualizarStatus(id, dto.status);

    if (!disponibilidadeAtualizada) {
      return fail(400, new BasicResponseDto("Não foi possível atualizar o status, exemplar não encontrado.", undefined));
    }

    return success(200, new BasicResponseDto("Disponibilidade atualizada com sucesso!", disponibilidadeAtualizada));
  } catch (err: any) {
    return fail(400, new BasicResponseDto(err.message, undefined));
  }
}

    @Delete("{id}")
    async removerLivroNoEstoque(
        @Path() id: number,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const livroRemovido = await this.estoqueService.removerExemplar(id);
            return success(200, new BasicResponseDto("Exemplar Deletado com sucesso em seu estoque!", livroRemovido))
        } catch (err: any) {
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }

}