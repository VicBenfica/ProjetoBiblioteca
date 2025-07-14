// src/model/dto/ExemplarDto.ts
export interface Estoque {
  codigo: number;
  livro_isbn: string;
  status: 'disponivel' | 'emprestado';
}
