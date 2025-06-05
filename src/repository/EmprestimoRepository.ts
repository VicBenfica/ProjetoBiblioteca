import { Emprestimo }  from "../model/Emprestimo";

export class EmprestimoRepository {
    private static instance: EmprestimoRepository;
    private emprestimos: Emprestimo[] = [];


    private constructor() {}

    public static getInstance(): EmprestimoRepository {
        if (!this.instance) {
        this.instance = new EmprestimoRepository();
    }
    return this.instance;
    }
}