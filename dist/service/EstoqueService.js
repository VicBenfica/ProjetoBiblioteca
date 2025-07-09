"use strict";
// src/service/EstoqueService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueService = void 0;
const Estoque_1 = require("../model/Estoque");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const LivroRepository_1 = require("../repository/LivroRepository");
class EstoqueService {
    estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance(); // ALTERADO: nome da instância
    livroRepository = LivroRepository_1.LivroRepository.getInstance(); // ALTERADO: nome da instância
    // ALTERADO: de 'novoExemplar' para 'cadastrarExemplar'
    // ALTERADO: parâmetros agora são livro_isbn, quantidade, quantidade_emprestada
    cadastrarExemplar(livro_isbn, quantidade, quantidade_emprestada = 0) {
        // Validação de campos obrigatórios
        if (!livro_isbn || quantidade === undefined || quantidade < 1) {
            throw new Error("ISBN do livro e quantidade são obrigatórios, e a quantidade deve ser positiva.");
        }
        if (quantidade_emprestada < 0 || quantidade_emprestada > quantidade) {
            throw new Error("Quantidade emprestada inválida.");
        }
        // Validação do ISBN do livro (se o livro existe)
        const livro = this.livroRepository.buscarLivroPorIsbn(livro_isbn); // ALTERADO: buscarLivroPorIsbn
        if (!livro) {
            throw new Error("Livro não encontrado.");
        }
        // Gerar o código automaticamente, em vez de recebê-lo como parâmetro
        const codigoGerado = this.estoqueRepository.gerarNovoCodigo();
        // Não é necessário buscar 'existente' aqui, o 'gerarNovoCodigo' garante unicidade para o idCounter simples
        // O construtor de Estoque já define o status inicial como 'disponivel'
        const novoExemplar = new Estoque_1.Estoque(codigoGerado, livro_isbn, quantidade, quantidade_emprestada);
        // Se todas as unidades já estão emprestadas na criação, o status deve ser 'emprestado'
        if (novoExemplar.quantidade_emprestada >= novoExemplar.quantidade) {
            novoExemplar.status = 'emprestado';
        }
        this.estoqueRepository.inserirExemplar(novoExemplar); // ALTERADO: inserirExemplar
        return novoExemplar;
    }
    // ALTERADO: Método para listar exemplares disponíveis
    listarDisponiveis() {
        return this.estoqueRepository.listarEstoque().filter(e => e.status === "disponivel"); // ALTERADO: listarEstoque
    }
    // ALTERADO: Método para buscar um exemplar específico por código
    buscarExemplar(codigo) {
        const exemplar = this.estoqueRepository.buscarPorCodigo(codigo); // ALTERADO: buscarPorCodigo
        // Não lança erro aqui, permite ao Controller lidar com 404
        return exemplar;
    }
    // ALTERADO: Método para atualizar status e quantidades emprestadas
    atualizarStatus(codigo, status) {
        const exemplar = this.buscarExemplar(codigo);
        if (!exemplar) {
            throw new Error("Exemplar não encontrado para atualização de status.");
        }
        if (exemplar.status === status) {
            // Não faz nada se o status já é o mesmo, apenas retorna
            return exemplar;
        }
        // Lógica de incremento/decremento de quantidade_emprestada baseada na mudança de status
        if (status === "emprestado") {
            if (exemplar.quantidade_emprestada >= exemplar.quantidade) {
                throw new Error("Todas as unidades deste exemplar já estão emprestadas. Não pode marcar mais como 'emprestado'.");
            }
            exemplar.quantidade_emprestada++;
        }
        else { // status === "disponivel"
            if (exemplar.quantidade_emprestada <= 0) {
                throw new Error("Nenhuma unidade deste exemplar está emprestada para ser disponibilizada.");
            }
            exemplar.quantidade_emprestada--;
        }
        exemplar.status = status; // Atualiza o status
        this.estoqueRepository.atualizarEstoque(exemplar); // Persiste a mudança no repositório (assumindo este método no repo)
        return exemplar;
    }
    // NOVO MÉTODO: Marcar como emprestado (chama o atualizarStatus)
    marcarComoEmprestado(codigo) {
        this.atualizarStatus(codigo, "emprestado");
    }
    // NOVO MÉTODO: Marcar como disponível (chama o atualizarStatus)
    marcarComoDisponivel(codigo) {
        this.atualizarStatus(codigo, "disponivel");
    }
    // MÉTODO EXISTENTE: verifica se existe algum exemplar para o ISBN (útil para remoção de livro, por exemplo)
    existeExemplarDoLivro(isbn) {
        return this.estoqueRepository.listarEstoque().some((e) => e.livro_isbn === isbn);
    }
    // MÉTODO EXISTENTE: Resumo do estoque por ISBN
    getResumoEstoque(isbn) {
        const exemplares = this.estoqueRepository.listarEstoque().filter((e) => e.livro_isbn === isbn);
        return {
            total: exemplares.length,
            disponiveis: exemplares.filter((e) => e.status === "disponivel").length,
        };
    }
    // ALTERADO: Método para remover exemplar
    removerExemplar(codigo) {
        const exemplar = this.buscarExemplar(codigo);
        if (!exemplar) {
            throw new Error("Exemplar não encontrado para remoção.");
        }
        if (exemplar.status === "emprestado" || exemplar.quantidade_emprestada > 0) {
            throw new Error("Não é possível remover um exemplar que está emprestado ou com unidades emprestadas.");
        }
        const sucesso = this.estoqueRepository.remover(codigo); // ALTERADO: chamar método 'remover'
        if (!sucesso) {
            throw new Error("Erro ao remover exemplar do repositório."); // Mais específico
        }
    }
    // NOVO MÉTODO: Listar todos os exemplares (para o controller)
    listarTodosExemplares() {
        return this.estoqueRepository.listarEstoque(); // ALTERADO: listarEstoque
    }
    // NOVO MÉTODO: atualizarExemplar (para a operação PUT genérica)
    atualizarExemplar(codigo, novosDados) {
        const exemplarAtual = this.estoqueRepository.buscarPorCodigo(codigo);
        if (!exemplarAtual) {
            return undefined;
        }
        const quantidadeAtualizada = novosDados.quantidade ?? exemplarAtual.quantidade;
        const quantidadeEmprestadaAtualizada = novosDados.quantidade_emprestada ?? exemplarAtual.quantidade_emprestada;
        const statusAtualizado = novosDados.status ?? exemplarAtual.status;
        const livroIsbnAtualizado = novosDados.livro_isbn ?? exemplarAtual.livro_isbn;
        // Validações
        if (quantidadeAtualizada < 1)
            throw new Error("A quantidade deve ser pelo menos 1.");
        if (quantidadeEmprestadaAtualizada < 0)
            throw new Error("A quantidade emprestada não pode ser negativa.");
        if (quantidadeEmprestadaAtualizada > quantidadeAtualizada)
            throw new Error("A quantidade emprestada não pode exceder a quantidade total.");
        if (novosDados.livro_isbn && novosDados.livro_isbn !== exemplarAtual.livro_isbn) {
            const livroExistente = this.livroRepository.buscarLivroPorIsbn(novosDados.livro_isbn);
            if (!livroExistente)
                throw new Error(`Novo Livro com ISBN ${novosDados.livro_isbn} não encontrado.`);
        }
        if (novosDados.status && !['disponivel', 'emprestado'].includes(novosDados.status)) {
            throw new Error("Status inválido. Use 'disponivel' ou 'emprestado'.");
        }
        // Construir o objeto atualizado
        const exemplarParaAtualizar = {
            codigo: exemplarAtual.codigo,
            livro_isbn: livroIsbnAtualizado,
            quantidade: quantidadeAtualizada,
            quantidade_emprestada: quantidadeEmprestadaAtualizada,
            status: statusAtualizado // Usa o status fornecido, ou o atual
        };
        // Se o status não foi fornecido nos novosDados, recalcule-o com base nas quantidades
        if (novosDados.status === undefined) {
            exemplarParaAtualizar.status = (exemplarParaAtualizar.quantidade_emprestada < exemplarParaAtualizar.quantidade) ? 'disponivel' : 'emprestado';
        }
        this.estoqueRepository.atualizarEstoque(exemplarParaAtualizar);
        return exemplarParaAtualizar;
    }
}
exports.EstoqueService = EstoqueService;
