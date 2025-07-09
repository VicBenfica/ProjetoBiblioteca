"use strict";
// src/controller/EstoqueController.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueController = void 0;
const EstoqueService_1 = require("../service/EstoqueService");
class EstoqueController {
    estoqueService = new EstoqueService_1.EstoqueService();
    // ALTERADO: de 'criarExemplar' para 'cadastrarExemplar'
    // O corpo da requisição agora espera 'livro_isbn', 'quantidade', 'quantidade_emprestada' (opcional)
    cadastrarExemplar(req, res) {
        try {
            const { livro_isbn, quantidade, quantidade_emprestada } = req.body; // Desestruturação para clareza
            const estoque = this.estoqueService.cadastrarExemplar(livro_isbn, quantidade, quantidade_emprestada); // ALTERADO: chamada do service
            res.status(201).json(estoque);
        }
        catch (error) {
            let message = "Não foi possível inserir exemplar!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({ message });
        }
    }
    // ALTERADO: Método para remover exemplar
    removerExemplar(req, res) {
        try {
            const codigo = Number(req.params.codigo); // Pega 'codigo' da URL
            if (isNaN(codigo) || !codigo) {
                res.status(400).json({ message: "Código de exemplar inválido!" });
                return;
            }
            this.estoqueService.removerExemplar(codigo); // ALTERADO: chamada do service
            res.status(200).json({ message: "Exemplar removido com sucesso." });
        }
        catch (error) {
            let message = "Erro ao remover o exemplar.";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({ message });
        }
    }
    // ALTERADO: Método para atualizar exemplar
    atualizarNovoExemplar(req, res) {
        try {
            const codigo = Number(req.params.codigo);
            if (isNaN(codigo) || !codigo) {
                res.status(400).json({ message: "Código de exemplar inválido!" });
                return;
            }
            const novosDados = req.body;
            const estoque = this.estoqueService.atualizarExemplar(codigo, novosDados); // ALTERADO: chamada do service
            if (!estoque) {
                res.status(404).json({ message: "Exemplar não encontrado para atualização!" });
                return;
            }
            res.status(200).json(estoque); // Status correto: 200 OK
        }
        catch (error) {
            let message = "Não foi possível atualizar o exemplar!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({ message });
        }
    }
    // ALTERADO: Método para detalhar exemplar
    detalharNovoExemplar(req, res) {
        try {
            const codigo = Number(req.params.codigo); // Pega 'codigo' da URL
            if (isNaN(codigo) || !codigo) {
                res.status(400).json({ message: "Código de exemplar inválido!" });
                return;
            }
            const estoque = this.estoqueService.buscarExemplar(codigo); // ALTERADO: chamada do service
            if (!estoque) {
                res.status(404).json({ message: "Exemplar não encontrado." });
                return;
            }
            res.status(200).json(estoque); // Status correto: 200 OK
        }
        catch (error) {
            let message = "Não foi possível detalhar o exemplar!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({ message });
        }
    }
    // ALTERADO: Método para listar exemplares
    listar(req, res) {
        try {
            const estoques = this.estoqueService.listarTodosExemplares(); // ALTERADO: chamar novo método
            res.status(200).json(estoques); // Status correto: 200 OK
        }
        catch (error) {
            let message = "Não foi possível listar!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({ message });
        }
    }
}
exports.EstoqueController = EstoqueController;
