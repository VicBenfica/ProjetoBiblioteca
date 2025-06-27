
export class Livro {
    id: number;
    titulo: string;
    autor: string;
    editora: string;
    edicao: string;
    isbn: string;
    categoria_id: number;
    //liga com categoria Livro



    constructor(id: number, titulo: string, autor: string, editora: string, edicao: string, isbn: string, categoria_id: number) {
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.edicao = edicao;
        this.isbn = isbn;
        this.categoria_id = categoria_id;
    }
}