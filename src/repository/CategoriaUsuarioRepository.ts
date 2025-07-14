import { CategoriaUsuario } from "../model/entity/CategoriaUsuario";
import { executarComandoSQL } from "../database/mysql";

export class CategoriaUsuarioRepository {
    private static instance: CategoriaUsuarioRepository;

    private constructor() { 
        this.criarTable();
    }

    public static getInstance(): CategoriaUsuarioRepository {
        if (!this.instance) {
            this.instance = new CategoriaUsuarioRepository;
        }
        return this.instance;
    }

    private imprimeResult(err: any, result: any) {
        if (result != undefined) {
            console.log("Dentro callback", result);
        }
    }

    private async criarTable() {
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.CategoriaUsuario(
                id INT AUTO_INCREMENT PRIMARY KEY, 
                nome VARCHAR(100) NOT NULL
                )`

        try {
            const resultado = await executarComandoSQL(query, []);
            console.log('Tabela de categoria de usuarios criada!', resultado);
        } catch (err) {
            console.error('Erro ao executar a query:', err);
        }
    }

    public async inserirCategoriasPadrao() {
        const categorias = ["Professor", "Aluno", "Bibliotecário"];
        await executarComandoSQL("CREATE TABLE IF NOT EXISTS biblioteca.CategoriaUsuario (id INT AUTO_INCREMENT PRIMARY KEY, nome VARCHAR(100) NOT NULL)", []);
        for (const nome of categorias) {
            try {
                const resultado = await executarComandoSQL(
                    "INSERT IGNORE INTO biblioteca.CategoriaUsuario (nome) VALUES (?)", [nome]);
                console.log('Categoria criada com sucesso:', resultado);
            } catch (err) {
                console.error('Erro ao criar categoria:', err);

            }
        }

    }



    public async listarCategorias(): Promise<CategoriaUsuario[]> {
        const categorias: CategoriaUsuario[] = [];

        try {
            const resultado = await executarComandoSQL("SELECT * FROM biblioteca.CategoriaUsuario", []);

            for (let i = 0; i < resultado.length; i++) {
                const dados = resultado[i];
                const categoria = new CategoriaUsuario(dados.id, dados.nome);
                categorias.push(categoria);
            }

            return categorias;
        } catch (err) {
            console.error('Erro ao listar categorias:', err);
            return [];
        }
    }

     public async buscarPorId(id: number): Promise<CategoriaUsuario | null> {
            const query = `SELECT * FROM biblioteca.CategoriaLivro WHERE id = ?`;
            try {
                const resultado = await executarComandoSQL(query, [id]);
    
                if (resultado && resultado.length > 0) {
                    const dados = resultado[0];
                    return new CategoriaUsuario(dados.id, dados.nome);
                }
    
                return null;
            } catch (err) {
                console.error("Erro ao buscar categoria por ID:", err);
                return null;
            }
        }
}