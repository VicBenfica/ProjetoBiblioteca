import { EstoqueEntity } from "../model/entity/EstoqueEntity";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { LivroRepository } from "../repository/LivroRepository";

export class EstoqueService {
    estoqueRepository: EstoqueRepository = EstoqueRepository.getInstance();
    livroRepository: LivroRepository = LivroRepository.getInstance();

    public async cadastrarExemplar(codigo: number, livro_isbn: string): Promise<EstoqueEntity> {
        if (!codigo || !livro_isbn) {
            throw new Error("ISBN e código do livro são obrigatórios!");
        }

        const livro = await this.livroRepository.buscarLivroPorISBN(livro_isbn);
        if (!livro) {
            throw new Error("Livro não encontrado.");
        }

        const existente = await this.estoqueRepository.buscarPorCodigo(codigo);
        if (existente) {
            throw new Error("Código já utilizado. Tente novamente.");
        }

        const novoExemplar = new EstoqueEntity(codigo, livro_isbn, 1, 0, "disponivel");
        return await this.estoqueRepository.inserirExemplar(novoExemplar);
    }

    public async listarDisponiveis(): Promise<EstoqueEntity[]> {
        const todos = await this.estoqueRepository.listarEstoque();
        return todos.filter(e => e.status === "disponivel");
    }

    public async buscarExemplar(codigo: number): Promise<EstoqueEntity> {
        const exemplar = await this.estoqueRepository.buscarPorCodigo(codigo);
        if (!exemplar) {
            throw new Error("Exemplar não encontrado.");
        }
        return exemplar;
    }

    public async atualizarStatus(codigo: number, status: "disponivel" | "emprestado"): Promise<EstoqueEntity> {
        const exemplar = await this.buscarExemplar(codigo);
        if (exemplar.status === status) return exemplar;

        await this.estoqueRepository.atualizarStatus(codigo, status);
        return await this.buscarExemplar(codigo);
    }

    public async marcarComoEmprestado(codigo: number): Promise<void> {
        const exemplar = await this.buscarExemplar(codigo);
        if (exemplar.status !== "disponivel") {
            throw new Error("Exemplar não está disponível para empréstimo.");
        }

        await this.estoqueRepository.atualizarStatus(codigo, "emprestado");
    }

    public async marcarComoDisponivel(codigo: number): Promise<void> {
        await this.estoqueRepository.atualizarStatus(codigo, "disponivel");
    }

    public async existeExemplarDoLivro(isbn: string): Promise<boolean> {
        const exemplares = await this.estoqueRepository.buscarPorISBN(isbn) || [];
        return exemplares.length > 0;
    }

    public async getResumoEstoque(isbn: string): Promise<{ total: number; disponiveis: number }> {
        const exemplares = await this.estoqueRepository.buscarPorISBN(isbn) || [];
        return {
            total: exemplares.length,
            disponiveis: exemplares.filter(e => e.status === "disponivel").length
        };
    }

    public async removerExemplar(codigo: number): Promise<void> {
        // Verifica se o exemplar existe
        const exemplar = await this.estoqueRepository.buscarPorCodigo(codigo);
        if (!exemplar) {
            throw new Error("Exemplar não encontrado.");
        }

        if (exemplar.status === "emprestado") {
            throw new Error("Exemplar não pode ser removido, pois está emprestado.");
        }

        await this.estoqueRepository.remover(codigo);
    }

}
