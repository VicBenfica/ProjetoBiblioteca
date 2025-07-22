export class EstoqueDto{
    isbn?: string;
    quantidade?: number;
    quantidade_emprestada?: number;
    disponibilidade?: 'disponivel' | 'emprestado';

    constructor(isbn?: string, quantidade?: number, quantidade_emprestada?: number, disponibilidade?: 'disponivel' | 'emprestado') {
        this.isbn = isbn;
        this.quantidade = quantidade;
        this.quantidade_emprestada = quantidade_emprestada ?? 0;
        this.disponibilidade = disponibilidade;
    }
}