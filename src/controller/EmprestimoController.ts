// src/controller/EmprestimoController.ts

import { Body, Controller, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa";
import { EmprestimoService } from "../service/EmprestimoService";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { Emprestimo } from "../model/dto/EmprestimoDto";

@Route("emprestimos")
@Tags("Emprestimos")

export class EmprestimoController extends Controller {
    private emprestimoService = new EmprestimoService();

    @Post()
    public async criarEmprestimo(
        @Body() dto: Emprestimo,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const { cpfUsuario, codigoExemplar } = dto;
            const emprestimo = this.emprestimoService.registrarEmprestimo(cpfUsuario, codigoExemplar);
            return success(201, new BasicResponseDto("Empréstimo realizado com sucesso", emprestimo));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message || "Erro ao registrar empréstimo", undefined));
        }
    }

    @Get()
    public async listarEmprestimos(
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const emprestimos = this.emprestimoService.listarEmprestimos();
            return success(200, new BasicResponseDto("Lista de empréstimos", emprestimos));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message || "Erro ao listar empréstimos", undefined));
        }
    }

    @Put("{id}/devolucao")
    public async registrarDevolucao(
        @Path() id: number,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const emprestimo = this.emprestimoService.registrarDevolucao(id);
            return success(200, new BasicResponseDto("Devolução registrada com sucesso", emprestimo));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message || "Erro ao registrar devolução", undefined));
        }
    }
}
