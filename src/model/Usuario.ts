
export class Estoque {
 id: number;
 nome: string;
 cpf: string;
 ativo: boolean;
 categoria_id: number;
 curso_id:number;

 
 constructor(id: number, nome: string, cpf:string,ativo:boolean,  categoria_id:number,curso_id:number,) {
 this.id = id;
 this.nome = nome;
 this.cpf = cpf;
 this.ativo = ativo;
 this.curso_id = curso_id;
 this.categoria_id = categoria_id;
 }
 }