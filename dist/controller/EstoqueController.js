"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueController = void 0;
const EstoqueService_1 = require("../service/EstoqueService");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
class EstoqueController {
    estoqueService = new EstoqueService_1.EstoqueService();
    criarExemplar(req, res) {
        try {
            const estoque = this.estoqueService.NovoExemplar(req.body);
            res.status(201).json(estoque);
        }
        catch (error) {
            let message = "Não foi possível inserir exemplar!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    removerExemplar(req, res) {
        try {
            const id = Number(req.body.id); // ou req.params.id
            if (!id) {
                res.status(400).json({ message: "Código inválido!" });
                return;
            }
            const estoques = EstoqueRepository_1.EstoqueRepository.getInstance().listarEstoques();
            const removido = this.estoqueService.removeExemplar(id, estoques);
            if (!removido) {
                res.status(400).json({
                    message: "Não foi possível remover o exemplar, ele pode estar emprestado."
                });
            }
            else {
                res.status(200).json({ message: "Exemplar removido com sucesso." });
            }
        }
        catch (error) {
            let message = "Erro ao remover o exemplar.";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({ message });
        }
    }
    atualizarNovoExemplar(req, res) {
        try {
            const id = Number(req.params.id);
            const novosDados = req.body;
            const estoque = this.estoqueService.atualizarDisponibilidadeExemplar(id, novosDados);
            res.status(201).json(estoque);
        }
        catch (error) {
            let message = "Não foi possível atualizar o exemplar!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    detalharNovoExemplar(req, res) {
        try {
            const id = Number(req.params.id);
            const estoque = this.estoqueService.detalhesExemplar(id);
            res.status(201).json(estoque);
        }
        catch (error) {
            let message = "Não foi possível detalhar o exemplar!!";
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
            const estoque = this.estoqueService.listarDisponiveis();
            res.status(201).json(estoque);
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
exports.EstoqueController = EstoqueController;
