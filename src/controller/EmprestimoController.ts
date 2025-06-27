import { EmprestimoService } from "../service/EmprestimoService";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { EstoqueService } from "../service/EstoqueService";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { Request, Response } from "express";
//Importa o Service e Repository

export class EmprestimoController {
    private emprestimoService = new EmprestimoService()
    //faz uma intancia, objeto da classe Empretimo service
    criarEmprestimo(req: Request, res: Response): void {
        try {
            const cpf = String(req.body.cpf);
            //receb o cpf 
            const estoque_id = Number(req.body.estoque_id);
            //recebe o id do estoque
            const emprestimo = this.emprestimoService.registrarEmprestimoPorCpf(cpf, estoque_id);
            //cria uma contante que recebe o metodo registrarEmprestimo por cpf
            res.status(201).json(emprestimo)
            //retorna um novo objeto de emprestimo em \JSON
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
            const id = Number(req.params.id);  
            const emprestimo = this.emprestimoService.registrarDevolucao(id);
            res.status(201).json(emprestimo);
        } catch (error: unknown) {
            let message: string = "Não foi possível registrar Devolução!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({ message });
        }
    }

    listar(req: Request, res: Response): void {
        try {
            const emprestimo = this.emprestimoService.listar()
            res.status(201).json(emprestimo)
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