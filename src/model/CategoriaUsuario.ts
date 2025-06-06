
export class Emprestimo {
 id: number;
 usuario_id: number;
 estoque_id: number;
 data_emprestimo: Date;
 data_devolucao: Date;
 data_entrega:Date;
 dias_atraso:number;
 suspensao_ate:Date;

 
 constructor(id: number, usuario_id: number, estoque_id:number,data_emprestimo:Date,data_devolucao:Date,data_entrega:Date, dias_atraso:number,  suspensao_ate:Date) {
 this.id = id;
 this.estoque_id = estoque_id;
 this.usuario_id = usuario_id;
 this.data_emprestimo = new Date();
 this.data_devolucao = new Date();
 this.data_entrega = new Date();
 this.dias_atraso = dias_atraso;
 this.suspensao_ate = new Date();

 }
 }