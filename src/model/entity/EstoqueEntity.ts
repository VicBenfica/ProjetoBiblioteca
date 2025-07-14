export class EstoqueEntity {
    codigo: number;
    livro_isbn: string;
    quantidade: number;
    quantidade_emprestada: number;
    status: 'disponivel' | 'emprestado';

    constructor(
        codigo: number,
        livro_isbn: string,
        quantidade: number,
        quantidade_emprestada: number,
        status?: 'disponivel' | 'emprestado' // opcional
    ) {
        this.codigo = codigo;
        this.livro_isbn = livro_isbn;
        this.quantidade = quantidade;
        this.quantidade_emprestada = quantidade_emprestada;

        // Se o status for passado, usa ele. Caso contrário, calcula automaticamente.
        this.status = status ?? (quantidade_emprestada < quantidade ? 'disponivel' : 'emprestado');
    }
}
