import { Estoque } from "../model/Estoque";
import { Livro } from "../model/Livro";

type DadosAtualizacaoEstoque = {
    id?: number;
    livro_id?: number;
    quantidade?: number;
    quantidade_emprestada?: number;
    disponivel?: boolean;
}

export class EstoqueRepository {
    private static instance: EstoqueRepository;
    private estoques: Estoque[] = [];
    private idCounter = 1;


    private constructor() { }

    public static getInstance(): EstoqueRepository {
        if (!this.instance) {
            this.instance = new EstoqueRepository();
        }
        return this.instance;
    }

    insereExemplar(exemplar: Estoque): void {
        this.estoques.push(exemplar);
    }


    listarEstoques(): Estoque[] {
        return this.estoques;
    }

    gerarNovoId(): number {
        return this.idCounter++;
    }



    listarExemplaresDisponiveis(): Estoque[] {
        return this.estoques.filter(estoque => estoque.disponivel);
    }



    buscarIndexPorId(id: number): number {
        return this.estoques.findIndex(e => e.id === id);
    }

    buscarExemplarPorId(id: number): Estoque | undefined {
        return this.estoques.find(e => e.id === id);
    }//Detalhes do exemplar

    removerExemplarPorIndex(index: number): void {
        this.estoques.splice(index, 1);
    }

    atualizarDisponibilidade(index: number, disponivel: boolean): void {
        this.estoques[index].disponivel = disponivel;
    }




}