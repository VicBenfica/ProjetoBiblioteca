import { EmprestimoService } from "../service/EmprestimoService";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { EstoqueService } from "../service/EstoqueService";
import { EstoqueRepository } from "../repository/EstoqueRepository";

import { Request, Response } from "express";

export class EmprestimoController {
    private emprestimoService = new EmprestimoService()

    criarEmprestimo(req: Request, res: Response): void {
        try {
            const cpf = String(req.body.cpf);
            const estoque_id = Number(req.body.estoque_id);
            const emprestimo = this.emprestimoService.registrarEmprestimoPorCpf(cpf,estoque_id);
            res.status(201).json(emprestimo)
        } catch (error: unknown) {
            let message: string = "Não foi possível registrar Emprestimo!!"
            if (error instanceof Error) {
                message = error.message
            }
            res.status(400).json({
                message: message
            })
        }
    }


    CriarDevolucao(req: Request, res: Response): void {
        try {
            
            const id = Number(req.body.emprestimo_id);
            const emprestimo = this.emprestimoService.registrarDevolucao(id);
            res.status(201).json(emprestimo)
        } catch (error: unknown) {
            let message: string = "Não foi possível registrar Devolução!!"
            if (error instanceof Error) {
                message = error.message
            }
            res.status(400).json({
                message: message
            })
        }
    }
}