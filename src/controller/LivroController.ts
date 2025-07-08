import { LivroService } from "../service/LivroService";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { Request, Response } from "express";

export class LivroController {
    private livroService = new LivroService()

    criarLivro(req: Request, res: Response): void {
        try {
            const livro = this.livroService.novoLivro(req.body)
            // Se o livro foi criado com sucesso, o status 201 (Created) é apropriado.
            res.status(201).json(livro)
        } catch (error: unknown) {
            let message: string = "Não foi possível inserir livro!!"
            if (error instanceof Error) {
                message = error.message
            }
            res.status(400).json({
                message: message
            })
        }
    }

    removerLivro(req: Request, res: Response): void {
        try {
            // A remoção de livro no controller está usando req.body.id,
            // mas a rota DELETE /library/livros/:isbn em App.ts usa req.params.isbn.
            // Se a rota usar :isbn, você deve usar req.params.isbn para obter o ID.
            const id = Number(req.params.isbn); // Alterado de req.body.id para req.params.isbn
            if (isNaN(id) || !id) { // Adicionado isNaN para verificar se é um número válido
                res.status(400).json({ message: "ID/ISBN inválido!" });
                return;
            }

            const estoques = EstoqueRepository.getInstance().listarEstoques();
            const removido = this.livroService.removeLivro(id, estoques);

            if (!removido) {
                res.status(400).json({ message: "Não foi possível remover o livro, ele pode estar emprestado." });
            } else {
                res.status(200).json({ message: "Livro removido com sucesso." });
            }

        } catch (error: unknown) {
            let message: string = "Erro ao remover o livro.";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({ message });
        }
    }

    atualizarNovoLivro(req: Request, res: Response): void {
        try {
            // A rota PUT /library/livros/:isbn em App.ts usa req.params.isbn.
            // Portanto, o ID para atualização deve vir de req.params.isbn.
            const id = Number(req.params.isbn); // Alterado de req.params.id para req.params.isbn
            if (isNaN(id) || !id) {
                res.status(400).json({ message: "ID/ISBN inválido!" });
                return;
            }
            const novosDados = req.body;

            const livro = this.livroService.atualizarLivro(id, novosDados);

            if (!livro) {
                res.status(404).json({ message: "Livro não encontrado." });
                return;
            }

            res.status(200).json(livro);
        } catch (error: unknown) {
            let message: string = "Não foi possível atualizar o livro!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({ message });
        }
    }

    detalharNovoLivro(req: Request, res: Response): void {
        try {
            const isbn = req.params.isbn; // Pega o ISBN (string) da URL
            if (!isbn) { // Verifica se o ISBN foi fornecido
                res.status(400).json({ message: "ISBN não fornecido!" });
                return;
            }

            const livro = this.livroService.detalhesLivro(isbn); // Passa o ISBN para o serviço
            if (!livro) {
                res.status(404).json({ message: "Livro não encontrado." });
                return;
            }
            res.status(200).json(livro);
        } catch (error: unknown) {
            let message: string = "Não foi possível detalhar o livro!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }

    listar(req: Request, res: Response): void {
        try {
            // O método listar no LivroService não espera um ID, ele lista todos os livros.
            // A chamada no Controller deve refletir isso.
            const livros = this.livroService.listar(); // Removido req.body.id
            res.status(200).json(livros); // 200 OK é mais apropriado para listar
        } catch (error: unknown) {
            let message: string = "Não foi possível listar!!"
            if (error instanceof Error) {
                message = error.message
            }
            res.status(400).json({
                message: message
            });
        }
    }
}