import { EstoqueService } from "../service/EstoqueService";
import { EstoqueRepository } from "../repository/EstoqueRepository";

import { Request, Response } from "express";

export class EstoqueController {
    private estoqueService = new EstoqueService()

    criarExemplar(req: Request, res: Response): void {
        try {
            const estoque = this.estoqueService.NovoExemplar(req.body)
            res.status(201).json(estoque)
        } catch (error: unknown) {
            let message: string = "Não foi possível inserir exemplar!!"
            if (error instanceof Error) {
                message = error.message
            }
            res.status(400).json({
                message: message
            })
        }
    }

    removerExemplar(req: Request, res: Response): void {
        try {
            const id = Number(req.body.id); // ou req.params.id
            if (!id) {
                res.status(400).json({ message: "Código inválido!" });
                return;
            }

            const estoques = EstoqueRepository.getInstance().listarEstoques();
            const removido = this.estoqueService.removeExemplar(id, estoques);

            if (!removido) {
                res.status(400).json({
                    message: "Não foi possível remover o exemplar, ele pode estar emprestado."
                });
            } else {
                res.status(200).json({ message: "Exemplar removido com sucesso." });
            }

        } catch (error: unknown) {
            let message = "Erro ao remover o exemplar.";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({ message });
        }
    }


    atualizarNovoExemplar(req: Request, res: Response): void {
        try {
            const id = Number(req.params.id);
            const novosDados = req.body;
            const estoque = this.estoqueService.atualizarDisponibilidadeExemplar(id, novosDados)
            res.status(201).json(estoque)
        } catch (error: unknown) {
            let message: string = "Não foi possível atualizar o exemplar!!"
            if (error instanceof Error) {
                message = error.message
            }
            res.status(400).json({
                message: message
            })
        }
    }

    detalharNovoExemplar(req: Request, res: Response): void {
        try {
            const id = Number(req.params.id);

            const estoque = this.estoqueService.detalhesExemplar(id)
            res.status(201).json(estoque)
        } catch (error: unknown) {
            let message: string = "Não foi possível detalhar o exemplar!!"
            if (error instanceof Error) {
                message = error.message
            }
            res.status(400).json({
                message: message
            })
        }
    }
    listar(req: Request, res: Response): void {
        try {
            const estoque = this.estoqueService.listarDisponiveis()
            res.status(201).json(estoque)
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