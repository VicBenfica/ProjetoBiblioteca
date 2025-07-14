import { CategoriaLivro } from "../model/entity/CategoriaLivro";
import { executarComandoSQL } from "../database/mysql";


export class CategoriaLivroRepository {
    private static instance: CategoriaLivroRepository;


    private constructor() {
        this.criarTable();
    }

    public static getInstance(): CategoriaLivroRepository {
        if (!this.instance) {
            this.instance = new CategoriaLivroRepository;
        }
        return this.instance;
    }

    private imprimeResult(err: any, result: any) {
        if (result != undefined) {
            console.log("Dentro callback", result);
        }
    }

    private async criarTable() {
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.CategoriaLivro(
            id INT AUTO_INCREMENT PRIMARY KEY, 
            nome VARCHAR(100) NOT NULL
            )`

        try {
            const resultado = await executarComandoSQL(query, []);
            console.log('Tabela de categoria de livros criada!', resultado);
        } catch (err) {
            console.error('Erro ao executar a query:', err);
        }
    }

    public async inserirCategoriasPadrao() {
        const categorias = ["Romance", "Computação", "Letras", "Gestão"];
        await executarComandoSQL("CREATE TABLE IF NOT EXISTS biblioteca.CategoriaLivro (id INT AUTO_INCREMENT PRIMARY KEY, nome VARCHAR(100) NOT NULL)", []);
        for (const nome of categorias) {
            try {
                const resultado = await executarComandoSQL(
                    "INSERT IGNORE INTO biblioteca.CategoriaLivro (nome) VALUES (?)", [nome]);
                console.log('Categoria criada com sucesso:', resultado);
            } catch (err) {
                console.error('Erro ao criar categoria:', err);

            }
        }

    }



    public async listarCategorias(): Promise<CategoriaLivro[]> {
        const categorias: CategoriaLivro[] = [];

        try {
            const resultado = await executarComandoSQL("SELECT * FROM biblioteca.CategoriaLivro", []);

            for (let i = 0; i < resultado.length; i++) {
                const dados = resultado[i];
                const categoria = new CategoriaLivro(dados.id, dados.nome);
                categorias.push(categoria);
            }

            return categorias;
        } catch (err) {
            console.error('Erro ao listar categorias:', err);
            return [];
        }
    }

    public async buscarPorId(id: number): Promise<CategoriaLivro | null> {
        const query = `SELECT * FROM biblioteca.CategoriaLivro WHERE id = ?`;
        try {
            const resultado = await executarComandoSQL(query, [id]);

            if (resultado && resultado.length > 0) {
                const dados = resultado[0];
                return new CategoriaLivro(dados.id, dados.nome);
            }

            return null;
        } catch (err) {
            console.error("Erro ao buscar categoria por ID:", err);
            return null;
        }
    }

}