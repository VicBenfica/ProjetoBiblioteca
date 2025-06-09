import { Emprestimo } from "../model/Emprestimo";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { Usuario } from "../model/Usuario";
import { LivroRepository } from "../repository/LivroRepository";
import { Livro } from "../model/Livro";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { Estoque } from "../model/Estoque";
import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";
import { CategoriaUsuario } from "../model/CategoriaUsuario";
import { CategoriaCursoRepository } from "../repository/CategoriaCursoRepository";
import { CategoriaCurso } from "../model/CategoriaCurso";
import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";
import { CategoriaLivro } from "../model/CategoriaLivro";


export class EmprestimoService {
    private emprestimoRepo = EmprestimoRepository.getInstance();
    private usuarioRepo = UsuarioRepository.getInstance();
    private estoqueRepo = EstoqueRepository.getInstance();
    private livroRepo = LivroRepository.getInstance();
    private categoriaUsuarioRepo = CategoriaUsuarioRepository.getInstance();
    private categoriaCursooRepo = CategoriaCursoRepository.getInstance();
    private categoriaLivroRepo = CategoriaLivroRepository.getInstance();


    registrarEmprestimoPorCpf(cpf: string, estoque_id: number): Emprestimo {
        const usuario = this.usuarioRepo.filtraUsuarioPorCpf(cpf);

        if (!usuario) throw new Error("Usuário não encontrado.");

        if (usuario.ativo !== "ativo") {
            throw new Error("Usuário inativo.");
        }

        const hoje = new Date();

        if (usuario.suspensao_ate && usuario.suspensao_ate > hoje) {
            throw new Error(`Usuário suspenso até ${usuario.suspensao_ate.toLocaleDateString()}.`);
        }

        const estoque = this.estoqueRepo.buscarPorId(estoque_id);
        if (!estoque || !estoque.disponivel) {
            throw new Error("Exemplar não encontrado ou indisponível.");
        }

        const livro = this.livroRepo.buscarLivroPorId(estoque.livro_id);
        if (!livro) {
            throw new Error("Livro vinculado não encontrado.");
        }

        // Corrigido: listar empréstimos do usuário
        const emprestimosAtivos = this.emprestimoRepo
            .listarEmprestimos()
            .filter(e => e.usuario_id === usuario.id && !e.data_entrega);

        // Buscar categoria
        const categoriaUsuario = this.categoriaUsuarioRepo.buscarPorId(usuario.categoria_id);
        const curso = this.categoriaCursooRepo.buscarPorId(usuario.curso_id);
        const categoriaLivro = this.categoriaLivroRepo.buscarPorId(livro.categoria_id);



        if (!categoriaUsuario || !curso) {
            throw new Error("Categoria ou curso do usuário não encontrado.");
        }

        const limiteEmprestimos = categoriaUsuario.nome.toLowerCase() === "professor" ? 5 : 3;
        if (emprestimosAtivos.length >= limiteEmprestimos) {
            throw new Error(`Limite de ${limiteEmprestimos} empréstimos atingido.`);
        }

        // Regras de devolução

        let diasDevolucao = 15;

        if (categoriaUsuario.nome.toLowerCase() === "professor") {
            diasDevolucao = 40;
        } else if (
            categoriaUsuario.nome.toLowerCase() === "aluno" &&
            categoriaLivro &&
            categoriaLivro.nome &&
            curso &&
            curso.nome &&
            curso.nome.toLowerCase() === categoriaLivro.nome.toLowerCase()
        ) {
            diasDevolucao = 30;
        }




        const dataDevolucao = new Date();
        dataDevolucao.setDate(hoje.getDate() + diasDevolucao);

        const novoEmprestimo = new Emprestimo(
            this.emprestimoRepo.gerarNovoId(),
            usuario.id,
            estoque_id,
            hoje,
            dataDevolucao,
            null,
            0,
            null
        );

        estoque.disponivel = false;
        this.estoqueRepo.atualizarEstoque(estoque);
        this.emprestimoRepo.salvarEmprestimo(novoEmprestimo);

        return novoEmprestimo;
    }



    registrarDevolucao(emprestimo_id: number): Emprestimo {
        const emprestimo = this.emprestimoRepo.buscarPorId(emprestimo_id);
        if (!emprestimo) {
            throw new Error("Empréstimo não encontrado.");
        }

        const usuario = this.usuarioRepo.buscarUsuarioPorId(emprestimo.usuario_id);
        if (!usuario) {
            throw new Error("Usuário vinculado ao empréstimo não encontrado.");
        }

        const estoque = this.estoqueRepo.buscarPorId(emprestimo.estoque_id);
        if (!estoque) {
            throw new Error("Exemplar vinculado ao empréstimo não encontrado.");
        }

        // Data da entrega
        const hoje = new Date();
        emprestimo.data_entrega = hoje;

        // Cálculo de atraso
        const atrasoMs = hoje.getTime() - emprestimo.data_devolucao.getTime();
        const diasAtraso = atrasoMs > 0 ? Math.ceil(atrasoMs / (1000 * 60 * 60 * 24)) : 0;
        emprestimo.dias_atraso = diasAtraso;

        if (diasAtraso > 0) {
            // Suspensão: 3 dias para cada dia de atraso
            const suspensao = new Date();
            suspensao.setDate(hoje.getDate() + diasAtraso * 3);

            emprestimo.suspensao_ate = suspensao;

            // Atualiza usuário
            usuario.ativo = "suspenso";
            usuario.diaSuspensao = diasAtraso * 3;
            emprestimo.suspensao_ate = suspensao;
            this.usuarioRepo.atualizarUsuarioPorId(usuario.id, usuario);
        } else {
            emprestimo.suspensao_ate = null;
        }

        // Torna o exemplar disponível novamente
        estoque.disponivel = true;
        this.estoqueRepo.atualizarEstoque(estoque);

        // Atualiza o empréstimo
        this.emprestimoRepo.atualizarEmprestimo(emprestimo);

        return emprestimo;
    }


    
}
