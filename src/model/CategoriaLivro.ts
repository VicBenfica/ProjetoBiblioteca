export class CategoriaLivro {
    id: number;
    nome: 'Romance' | 'Computação' | 'Letras' | 'Gestão';


    constructor(id: number, nome: 'Romance' | 'Computação' | 'Letras' | 'Gestão') {
        this.id = id;
        this.nome = nome;
    }
}
