"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const UsuarioService_1 = require("../service/UsuarioService");
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository");
class UsuarioController {
    usuarioService = new UsuarioService_1.UsuarioService();
    criarUsuario(req, res) {
        try {
            const usuario = this.usuarioService.novoUsuario(req.body);
            res.status(201).json(usuario);
        }
        catch (error) {
            let message = "Não foi possível criar o registro!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    removerUsuario(req, res) {
        try {
            const emprestimos = EmprestimoRepository_1.EmprestimoRepository.getInstance().listarEmprestimos();
            const usuario = this.usuarioService.removeUsuarioPorCpf(req.body.cpf, emprestimos);
            res.status(201).json(usuario);
        }
        catch (error) {
            let message = "Não foi possível remover o usuario!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    atualizarNovoUsuario(req, res) {
        try {
            const cpf = req.params.cpf;
            const novosDados = req.body;
            const usuario = this.usuarioService.atualizarUsuario(cpf, novosDados);
            res.status(201).json(usuario);
        }
        catch (error) {
            let message = "Não foi possível atualizar o usuario!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    detalharUsuario(req, res) {
        try {
            const cpf = req.params.cpf;
            const usuario = this.usuarioService.detalhesUsuario(cpf);
            res.status(201).json(usuario);
        }
        catch (error) {
            let message = "Não foi possível detalhar o usuario!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    listar(req, res) {
        try {
            const usuario = this.usuarioService.listar(req.body.id);
            res.status(201).json(usuario);
        }
        catch (error) {
            let message = "Não foi possível listar!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
}
exports.UsuarioController = UsuarioController;
