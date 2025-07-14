import { CategoriaCurso } from "../model/entity/CategoriaCurso";
import { executarComandoSQL } from "../database/mysql";


export class CategoriaCursoRepository {
    private static instance: CategoriaCursoRepository;


    private constructor() {
        this.criarTable();
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaCursoRepository;
        }
        return this.instance;
    }



    private async criarTable() {
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.CategoriaCurso(
        id INT AUTO_INCREMENT PRIMARY KEY, 
        nome VARCHAR(100) NOT NULL
        )`

        try {
            const resultado = await executarComandoSQL(query, []);
            console.log('Tabela de categoria de cursos criada!', resultado);
        } catch (err) {
            console.error('Erro ao executar a query:', err);
        }
    }

    public async inserirCategoriasPadrao() {
        const categorias = ["ADS", "Pedagogia", "Administração"];
        await executarComandoSQL("CREATE TABLE IF NOT EXISTS biblioteca.CategoriaCurso (id INT AUTO_INCREMENT PRIMARY KEY, nome VARCHAR(100) NOT NULL)", []);
        for (const nome of categorias) {
            try {
                const resultado = await executarComandoSQL(
                    "INSERT IGNORE INTO biblioteca.CategoriaCurso (nome) VALUES (?)", [nome]);
                console.log('Categoria criada com sucesso:', resultado);
            } catch (err) {
                console.error('Erro ao criar categoria:', err);

            }
        }

    }



    public async listarCategorias(): Promise<CategoriaCurso[]> {
        const categorias: CategoriaCurso[] = [];

        try {
            const resultado = await executarComandoSQL("SELECT * FROM biblioteca.CategoriaCurso", []);

            for (let i = 0; i < resultado.length; i++) {
                const dados = resultado[i];
                const categoria = new CategoriaCurso(dados.id, dados.nome);
                categorias.push(categoria);
            }
            return categorias;
        } catch (err) {
            console.error('Erro ao listar categorias:', err);
            return [];
        }
    }

     public async buscarPorId(id: number): Promise<CategoriaCurso | null> {
            const query = `SELECT * FROM biblioteca.CategoriaLivro WHERE id = ?`;
            try {
                const resultado = await executarComandoSQL(query, [id]);
    
                if (resultado && resultado.length > 0) {
                    const dados = resultado[0];
                    return new CategoriaCurso(dados.id, dados.nome);
                }
    
                return null;
            } catch (err) {
                console.error("Erro ao buscar categoria por ID:", err);
                return null;
            }
        }


}