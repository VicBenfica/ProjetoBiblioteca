export class CategoriaCurso {
    id: number;
    nome: 'ADS' | 'Pedagogia' | 'Administração';


    constructor(id: number, nome: 'ADS' | 'Pedagogia' | 'Administração') {
        this.id = id;
        this.nome = nome;
    }
}
