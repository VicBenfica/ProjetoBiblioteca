import { Estoque }  from "../model/Estoque";
import { Livro }  from "../model/Livro";

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

    private constructor() {}

    public static getInstance(): EstoqueRepository {
        if (!this.instance) {
        this.instance = new EstoqueRepository();
    }
    return this.instance;
    }

    insereLivro(livro:Livro){
    this.estoques.push(livro);
    }
        
        
}