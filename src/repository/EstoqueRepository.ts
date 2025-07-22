import {Estoque} from '../model/Estoque';

export class EstoqueRepository{
    private static instance: EstoqueRepository;
    private exemplares: Estoque[] = [];

    private constructor() {}
    
    public static getInstance(): EstoqueRepository{
        if(!this.instance){
            this.instance = new EstoqueRepository();
        }

        return this.instance;
    }

    insereLivroNoEstoque(livro: Estoque){
        this.exemplares.push(livro);
    }

    filtraLivroNoEstoque(cod: number){
        return this.exemplares.find(estoque => Number(estoque.cod) === Number(cod));
    }

    listarEstoque(){
        return this.exemplares;
    }

    atualizarDisponibilidade(cod: number, novaDisponibilidade: any){
        const index = this.findIndex(cod);
        const estoque = this.exemplares[index];

        if(!novaDisponibilidade || !novaDisponibilidade.disponibilidade) {
            throw new Error("É necessário informar a nova disponibilidade");
        }

        if(novaDisponibilidade.disponibilidade !== 'disponivel' && novaDisponibilidade.disponibilidade !== 'não-disponivel') {
            throw new Error("Disponibilidade inválida. Use 'disponivel' ou 'não-disponivel'");
        }

        estoque.disponibilidade = novaDisponibilidade.disponibilidade;
        this.exemplares[index] = estoque;
        return estoque;
    }

    removerLivroNoEstoque(cod: number){
        const index = this.findIndex(cod);
        const estoque = this.exemplares[index];

        if(estoque.disponibilidade == 'disponivel' ){
            return this.exemplares.splice(index, 1);
        } else{
            throw new Error("Este livro não pode ser excluido, assim que estiver disponivel, você poderá excluir!")
        }
    }

    quantidadeLivrosEmprestados(cod:number){
        return this.exemplares.find(estoque => Number(estoque.cod) === Number(cod) && estoque.quantidade_emprestada > 0);
    }

    private findIndex(cod: number): number{
        const index = this.exemplares.findIndex(estoque => estoque.cod == cod);

        if(index == -1){
            throw new Error("Codigo informado não foi encontrado no estoque!");
        }

        return index;
    }

}