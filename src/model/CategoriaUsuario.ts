export class CategoriaUsuario {
    id: number;
    nome: 'aluno' | 'professor' | 'bibliotecario';

    constructor(id: number, nome: 'aluno' | 'professor' | 'bibliotecario') {
        this.id = id;
        this.nome = nome;
    }
}
