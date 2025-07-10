import { CategoriaCurso } from "../model/entity/CategoriaCurso";
import { executarComandoSQL } from "../database/mysql";


export class CategoriaCursoRepository {
    private static instance: CategoriaCursoRepository;


    private constructor() {

    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaCursoRepository;
        }
        return this.instance;
    }

    private imprimeResult(err:any, result:any){
        if(result != undefined){
            console.log("Dentro callback", result);
        }
    }


   
    private async createTable() {
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.CategoriaCurso(
        id INT AUTO_INCREMENT PRIMARY KEY, 
        nome VARCHAR(100) NOT NULL
        )`

        try {
            const resultado = await executarComandoSQL(query, []);
            console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Erro ao executar a query:', err);
        }
    }

    insertProduct(name: string, price: number){
        try {
            const resultado = executarComandoSQL(
                "INSERT INTO vendas.Product (name, price) VALUES (?, ?)",
                [name, price], this.imprimeResult
            );
            console.log('Produto inserido com sucesso:', resultado);
        } catch (err) {
            console.error('Erro ao inserir o produto:', err);
            if( err instanceof Error)
                throw err
        }
    }
}