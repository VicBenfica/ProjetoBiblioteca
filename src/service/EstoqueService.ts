import { Estoque } from "../model/Estoque";
import { EstoqueRepository } from "../repository/EstoqueRepository";

type DadosManualEstoque = {
    id: number;
    livro_id: number;
    quantidade: number;
    quantidade_emprestada: number;
    disponivel: boolean;
};


export class EstoqueService {
    private estoqueRepo = EstoqueRepository.getInstance();


    NovoExemplar(dados: DadosManualEstoque): Estoque {
        // Validação
        if (
            dados.id === undefined ||
            dados.livro_id === undefined ||
            dados.quantidade === undefined ||
            dados.quantidade_emprestada === undefined ||
            dados.disponivel === undefined
        ) {
            throw new Error("Todos os campos são obrigatórios.");
        }

        if (typeof dados.id !== "number" || dados.id <= 0) {
            throw new Error("ID inválido.");
        }
        //Garantem que o id seja um número válido
        if (dados.quantidade < 1) {
            throw new Error("A quantidade deve ser pelo menos 1.");
        }
        //Que a quantidade seja positiva.
        if (dados.quantidade_emprestada < 0) {
            throw new Error("A quantidade emprestada não pode ser negativa.");
        }

        if (dados.quantidade_emprestada > dados.quantidade) {
            throw new Error("A quantidade emprestada não pode exceder a quantidade total.");
        }//Que não haja mais livros emprestados do que disponíveis.

        const exemplar = new Estoque(
            dados.id,
            dados.livro_id,
            dados.quantidade,
            dados.quantidade_emprestada,
            dados.disponivel
        );
        //insere o exemplar
        this.estoqueRepo.insereExemplar(exemplar);
        return exemplar;
    }

    detalhesExemplar(id: number): Estoque | undefined {
        return this.estoqueRepo.buscarPorId(id);
    }

    atualizarDisponibilidadeExemplar(id: number, disponivel: boolean): boolean {
        const index = this.estoqueRepo.buscarIndexPorId(id);

        if (index === -1) {
            console.log("Exemplar não encontrado.");
            return false;
        }
        //Erro se n tiver exemplar
        this.estoqueRepo.atualizarDisponibilidadePorId(id, disponivel);
        //atualiza disponibilidade
        return true;
    }

    removeExemplar(id: number, estoque: Estoque[]): boolean {
        // Verifica se existe algum exemplar emprestado
        const emprestado = estoque.some(e => e.livro_id === id && e.quantidade_emprestada > 0);
        //some: quando pelo menos um satisfazer a condição
        // que tem o id q tem um exemplar emprestado
        if (emprestado) {
            console.log("Não é possível remover: o exemplar está emprestado.");
            return false;
        }

        const index = this.estoqueRepo.buscarIndexPorId(id);
        //pega a posiçao
        if (index === -1) {
            console.log("Exemplar não encontrado.");
            return false;
        }//retoena false de sele não fpr encontrado

        this.estoqueRepo.removerExemplarPorIndex(index);
        console.log("Exemplar removido com sucesso.");
        return true;
    }
    listarDisponiveis() {
        return this.estoqueRepo.listarExemplaresDisponiveis();
    }
    listar() {
        return this.estoqueRepo.listarEstoques();
    }
}
