"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoController = void 0;
const EmprestimoService_1 = require("../service/EmprestimoService");
class EmprestimoController {
    emprestimoService = new EmprestimoService_1.EmprestimoService();
    criarEmprestimo(req, res) {
        try {
            const cpf = String(req.body.cpf);
            const estoque_id = Number(req.body.estoque_id);
            const emprestimo = this.emprestimoService.registrarEmprestimoPorCpf(cpf, estoque_id);
            res.status(201).json(emprestimo);
        }
        catch (error) {
            let message = "Não foi possível registrar Emprestimo!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    CriarDevolucao(req, res) {
        try {
            const id = Number(req.body.emprestimo_id);
            const emprestimo = this.emprestimoService.registrarDevolucao(id);
            res.status(201).json(emprestimo);
        }
        catch (error) {
            let message = "Não foi possível registrar Devolução!!";
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
            const emprestimo = this.emprestimoService.listar();
            res.status(201).json(emprestimo);
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
exports.EmprestimoController = EmprestimoController;
