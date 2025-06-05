
export class Usuario {
 nome: string;
 cpf: string;
 ativo: boolean;
 categoria_id: number;
 curso_id:number;
 status: 'ativo' | 'inativo' | 'suspenso';
 diaSuspensao: number;


 
 constructor( nome: string, cpf:string,ativo:boolean,  categoria_id:number,curso_id:number,diaSuspensao:number) {

 this.nome = nome;
 this.cpf = cpf;
 this.ativo = ativo;
 this.curso_id = curso_id;
 this.categoria_id = categoria_id;
 this.status ='ativo';
 this.diaSuspensao = 0;
 }
 }