import { executarComandoSQL } from '../database/mysql';
import { EstoqueEntity } from '../model/entity/EstoqueEntity';

export class EstoqueRepository {
    private static instance: EstoqueRepository;
    private exemplares: EstoqueEntity[] = [];

    private constructor() { }

    public static getInstance(): EstoqueRepository {
        if (!this.instance) {
            this.instance = new EstoqueRepository();
        }
        return this.instance;
    }

    public async inserirExemplar(exemplar: EstoqueEntity): Promise<EstoqueEntity> {
        const query = `
        INSERT INTO biblioteca.Estoque (livro_isbn, quantidade, quantidade_emprestada, status)
        VALUES (?, ?, ?, ?)`;

        const valores = [
            exemplar.livro_isbn,
            exemplar.quantidade,
            exemplar.quantidade_emprestada,
            exemplar.status
        ];

        const resultado = await executarComandoSQL(query, valores);

        // Retorna exemplar com ID gerado
        return new EstoqueEntity(
            resultado.insertId,
            exemplar.livro_isbn,
            exemplar.quantidade,
            exemplar.quantidade_emprestada,
            exemplar.status
        );
    }


    public async buscarPorISBN(isbn: string): Promise<EstoqueEntity[]> {
        const query = `SELECT * FROM biblioteca.Estoque WHERE livro_isbn = ?`;
        const resultado = await executarComandoSQL(query, [isbn]);

        if (!resultado || resultado.length === 0) return [];

        return resultado.map((row: any) =>
            new EstoqueEntity(row.codigo, row.livro_isbn, row.quantidade, row.quantidade_emprestada, row.status)
        );
    }


    buscarPorCodigo(codigo: number): EstoqueEntity | undefined {
        return this.exemplares.find(exemplar => exemplar.codigo === codigo);
    }

    listarEstoque(): EstoqueEntity[] {
        return this.exemplares;
    }

    atualizarStatus(codigo: number, status: "emprestado" | "disponivel"): boolean {
        const exemplar = this.buscarPorCodigo(codigo);
        if (!exemplar) return false;
        exemplar.status = status;
        return true;
    }

    remover(codigo: number): boolean {
        const index = this.exemplares.findIndex(e => e.codigo === codigo);
        if (index === -1) return false;

        this.exemplares.splice(index, 1);
        return true;
    }
}