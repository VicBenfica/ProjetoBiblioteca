export class Emprestimo {
    //classe exportavel
    id: number;
    usuario_id: number;
    estoque_id: number; //exemplar emprestado
    data_emprestimo: Date; //quando foi pego
    data_devolucao: Date; //prazo para ser devolvido
    data_entrega: Date | null; //quando realmente foi devolvido
    suspensao_ate: Date | null;//caso teve aatraso, mostra a data que ira permanecer suspenso
    dias_atraso: number; //qtd de dias que a devolução atrasou


    constructor(
        id: number,
        usuario_id: number,
        estoque_id: number,
        data_emprestimo: Date,
        data_devolucao: Date,
        data_entrega: Date | null,
        dias_atraso: number,
        suspensao_ate: Date | null,
    ) {
        this.id = id;
        this.usuario_id = usuario_id;
        this.estoque_id = estoque_id;
        this.data_emprestimo = data_emprestimo;
        this.data_devolucao = data_devolucao;
        this.data_entrega = data_entrega;
        this.dias_atraso = dias_atraso;
        this.suspensao_ate = suspensao_ate;
    }
}
