import { CategoriaLivro } from "../model/entity/CategoriaLivro";
import { executarComandoSQL } from "../database/mysql";
import { error } from "console";

export class CategoriaLivroRepository{
    private static instance: CategoriaLivroRepository;

    private constructor(){
        this.createTable();
       
    }

    public static getInstance(): CategoriaLivroRepository {
        if(!this.instance){
            this.instance = new CategoriaLivroRepository;
        this.inserirCategoriasPadrao();
        }
        return this.instance;
    }

    private async createTable(){
    const query = `CREATE TABLE IF NOT EXISTS biblioteca.CategoriaLivro(
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(100) NOT NULL
                )`
        
        try{
            const resultado = await executarComandoSQL(query, []);
            console.log('Tabela de categoria de livros foi criada com sucesso!', resultado);
        } catch(err){
            console.error('Erro ao executar a query de estoque: ', err);
        }
    }

    public static async inserirCategoriasPadrao(){
        const categorias = ["Romance", "Computação", "Letras", "Gestão"];
        await executarComandoSQL("CREATE TABLE IF NOT EXISTS biblioteca.CategoriaLivro(id INT AUTO_INCREMENT PRIMARY KEY, nome VARCHAR(100) NOT NULL)", []);
        for(const nome of categorias){
            try{
                const resultado = await executarComandoSQL("INSERT IGNORE INTO biblioteca.CategoriaLivro (nome) values (?)",[nome]);
                console.log('Categoria criada com sucesso!', resultado);
            } catch(err){
                console.error(`Erro ao inserir categoria ${nome}:`, err);
            }
        }
    }

    async listarCategoriasLivro(): Promise<CategoriaLivro[]>{
        const resultado = await executarComandoSQL("SELECT * FROM biblioteca.CategoriaLivro", []);
        const categorias: CategoriaLivro[] = [];

        if(resultado && resultado.length > 0){
            for (let i = 0; i < resultado.length; i++) {
                const row = resultado[i];
                categorias.push(new CategoriaLivro(row.id, row.nome));
            }
        }

        return categorias;
    }

    async encontrarCategoria(livro: string): Promise<CategoriaLivro | null>{
        const query = `SELECT * FROM biblioteca.CategoriaLivro WHERE nome = ?`;
        const resultado = await executarComandoSQL(query, [livro]);

        if(resultado && resultado.length > 0){
            const row = resultado[0];
            return new CategoriaLivro(row.id, row.nome);
        }

        return null;
    }

}