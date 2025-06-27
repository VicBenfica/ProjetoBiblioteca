
export class Estoque {
    id: number; //codigo
    livro_id: number; //isbn? //se interliga com livros
    quantidade: number;
    quantidade_emprestada: number;
    disponivel: boolean; // se há exemplares disponiveis para 
    //emprestimo



    constructor(id: number, livro_id: number, quantidade: number, quantidade_emprestada: number, disponivel: boolean) {
        this.id = id;
        this.livro_id = livro_id;
        this.quantidade = quantidade;
        this.quantidade_emprestada = quantidade_emprestada;
        this.disponivel = disponivel;
    }
}