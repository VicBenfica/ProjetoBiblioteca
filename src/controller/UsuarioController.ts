import { UsuarioService } from "../service/UsuarioService";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";

import { Request, Response } from "express";

export class UsuarioController {
    private usuarioService = new UsuarioService()

    criarUsuario(req: Request, res: Response): void {
        try {
            const usuario = this.usuarioService.novoUsuario(req.body)
            res.status(201).json(usuario)
        } catch (error: unknown) {
            let message: string = "Não foi possível criar o registro!!"
            if (error instanceof Error) {
                message = error.message
            }
            res.status(400).json({
                message: message
            })
        }
    }

    removerUsuario(req: Request, res: Response): void {
        try {
            const emprestimos = EmprestimoRepository.getInstance().listarEmprestimos();
            //verifica se o usuario possui emprestimos ativos, se não tiver, pode ser removido
            const usuario = this.usuarioService.removeUsuarioPorCpf(req.body.cpf, emprestimos)
            res.status(201).json(usuario)
        } catch (error: unknown) {
            let message: string = "Não foi possível remover o usuario!!"
            if (error instanceof Error) {
                message = error.message
            }
            res.status(400).json({
                message: message
            })
        }
    }

    atualizarNovoUsuario(req: Request, res: Response): void {
        try {
            const cpf = req.params.cpf;
            const novosDados = req.body;
            const usuario = this.usuarioService.atualizarUsuario(cpf, novosDados)
            res.status(201).json(usuario)
        } catch (error: unknown) {
            let message: string = "Não foi possível atualizar o usuario!!"
            if (error instanceof Error) {
                message = error.message
            }
            res.status(400).json({
                message: message
            })
        }
    }

    detalharUsuario(req: Request, res: Response): void {
        try {
            const cpf = req.params.cpf;

            const usuario = this.usuarioService.detalhesUsuario(cpf)
            res.status(201).json(usuario)
        } catch (error: unknown) {
            let message: string = "Não foi possível detalhar o usuario!!"
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
            const usuarios = this.usuarioService.listarTodos();
            res.status(200).json(usuarios);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }






}
