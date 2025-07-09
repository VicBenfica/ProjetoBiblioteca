"use strict";
// src/controller/UsuarioController.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const UsuarioService_1 = require("../service/UsuarioService");
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository"); // Manter import
class UsuarioController {
    usuarioService = new UsuarioService_1.UsuarioService();
    criarUsuario(req, res) {
        try {
            const usuario = this.usuarioService.novoUsuario(req.body);
            res.status(201).json(usuario); // 201 Created é CORRETO para criação
        }
        catch (error) {
            let message = "Não foi possível criar o registro!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({ message: message });
        }
    }
    removerUsuario(req, res) {
        try {
            const emprestimos = EmprestimoRepository_1.EmprestimoRepository.getInstance().listarEmprestimos();
            // A remoção no service agora recebe o CPF e a lista de empréstimos
            const removido = this.usuarioService.removeUsuarioPorCpf(req.body.cpf, emprestimos);
            if (!removido) {
                res.status(400).json({ message: "Não foi possível remover o usuário. Ele pode possuir empréstimos ativos." });
            }
            else {
                res.status(200).json({ message: "Usuário removido com sucesso." }); // 200 OK é CORRETO para remoção com corpo
                // Alternativa: res.status(204).send(); para No Content
            }
        }
        catch (error) {
            let message = "Não foi possível remover o usuário!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({ message: message });
        }
    }
    atualizarNovoUsuario(req, res) {
        try {
            const cpf = req.params.cpf;
            const novosDados = req.body;
            const usuario = this.usuarioService.atualizarUsuario(cpf, novosDados);
            if (!usuario) {
                res.status(404).json({ message: "Usuário não encontrado para atualização." });
                return;
            }
            res.status(200).json(usuario); // 200 OK é CORRETO para atualização
        }
        catch (error) {
            let message = "Não foi possível atualizar o usuário!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({ message: message });
        }
    }
    detalharUsuario(req, res) {
        try {
            const cpf = req.params.cpf;
            const usuario = this.usuarioService.detalhesUsuario(cpf);
            if (!usuario) {
                res.status(404).json({ message: "Usuário não encontrado." });
                return;
            }
            res.status(200).json(usuario); // 200 OK é CORRETO para detalhamento
        }
        catch (error) {
            let message = "Não foi possível detalhar o usuário!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({ message: message });
        }
    }
    listar(req, res) {
        try {
            const usuarios = this.usuarioService.listarTodos();
            res.status(200).json(usuarios); // 200 OK é CORRETO para listagem
        }
        catch (error) { // Any aqui é aceitável para o error, mas melhor usar unknown e type guard
            res.status(500).json({ message: error.message });
        }
    }
}
exports.UsuarioController = UsuarioController;
