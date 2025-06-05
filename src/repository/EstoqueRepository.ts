import { Estoque }  from "../model/Estoque";

export class EstoqueRepository {
    private static instance: EstoqueRepository;
    private emprestimos: Estoque[] = [];

    private constructor() {}

    public static getInstance(): EstoqueRepository {
        if (!this.instance) {
        this.instance = new EstoqueRepository();
    }
    return this.instance;
    }
}