import { LivroService } from "../service/LivroService";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { Request, Response } from "express";

export class LivroController {
    private livroService = new LivroService()

    criarLivro(req: Request, res: Response): void {
        try {
            const livro = this.livroService.novoLivro(req.body)
            res.status(201).json(livro)
        } catch (error: unknown) {
            let message: string = "Não foi possível inserir livro!!"
            if (error instanceof Error) {
                message = error.message
            }
            res.status(400).json({
                message: message
            })
        }
    }

    removerLivro(req: Request, res: Response): void {
        try {
            const id = Number(req.body.id);
            if (!id) {
                res.status(400).json({ message: "ID inválido!" });
                return;
            }

            const estoques = EstoqueRepository.getInstance().listarEstoques(); // correto
            const removido = this.livroService.removeLivro(id, estoques); // correto

            if (!removido) {
                res.status(400).json({ message: "Não foi possível remover o livro, ele pode estar emprestado." });
            } else {
                res.status(200).json({ message: "Livro removido com sucesso." });
            }

        } catch (error: unknown) {
            let message: string = "Erro ao remover o livro.";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({ message });
        }
    }

    atualizarNovoLivro(req: Request, res: Response): void {
        try {
            const id = Number(req.params.id);
            const novosDados = req.body;
            const livro = this.livroService.atualizarLivro(id, novosDados)
            res.status(201).json(livro)
        } catch (error: unknown) {
            let message: string = "Não foi possível atualizar o livro!!"
            if (error instanceof Error) {
                message = error.message
            }
            res.status(400).json({
                message: message
            })
        }
    }

    detalharNovoLivro(req: Request, res: Response): void {
        try {
            const id = Number(req.params.id);

            const livro = this.livroService.detalhesLivro(id)
            res.status(201).json(livro)
        } catch (error: unknown) {
            let message: string = "Não foi possível detalhar o livro!!"
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
            const livro = this.livroService.listar(req.body.id)
            res.status(201).json(livro)
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
