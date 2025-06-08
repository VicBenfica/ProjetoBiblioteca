import { Emprestimo } from "../model/Emprestimo";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { Usuario } from "../model/Usuario";
import { LivroRepository } from "../repository/LivroRepository";
import { Livro } from "../model/Livro";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { Estoque } from "../model/Estoque";


export class EmprestimoService {
    private emprestimoRepo = EmprestimoRepository.getInstance();
    private usuarioRepo = UsuarioRepository.getInstance();
    private estoqueRepo = EstoqueRepository.getInstance();
    private livroRepo = LivroRepository.getInstance();

    registrarEmprestimoPorCpf(cpf: string, estoque_id: number): Emprestimo {
        const usuario = this.usuarioRepo.filtraUsuarioPorCpf(cpf);

        if (!usuario) {
            throw new Error("Usuário com o CPF informado não encontrado.");
        }

        if (usuario.ativo !== "ativo") {
            throw new Error("Usuário não está ativo.");
        }

        const hoje = new Date();

        if (usuario.suspensao_ate && usuario.suspensao_ate > hoje) {
            throw new Error(`Usuário está suspenso até ${usuario.suspensao_ate.toLocaleDateString()}.`);
        }

        const estoque = this.estoqueRepo.buscarPorId(estoque_id);
        if (!estoque) {
            throw new Error("Exemplar (estoque) não encontrado.");
        }

        if (!estoque.disponivel) {
            throw new Error("O exemplar não está disponível.");
        }

        const livro = this.livroRepo.buscarPorId(estoque.livro_id);
        if (!livro) {
            throw new Error("Livro vinculado ao exemplar não encontrado.");
        }


        //olhar
        const emprestimosAtivos = this.emprestimoRepo
            .listarEmprestimosPorUsuario(usuario_id)
            .filter(e => !e.data_entrega);

        const limiteEmprestimos = usuario.categoria.toLowerCase() === "professor" ? 5 : 3;

        if (emprestimosAtivos.length >= limiteEmprestimos) {
            throw new Error(`Usuário já possui o limite de ${limiteEmprestimos} empréstimos.`);
        }

        // Calcular dias de devolução conforme regra
        let diasDevolucao: number;

        if (usuario.categoria.toLowerCase() === "professor") {
            diasDevolucao = 40;
        } else if (
            usuario.categoria.toLowerCase() === "aluno" &&
            usuario.curso.toLowerCase() === livro.categoria.toLowerCase()
        ) {
            diasDevolucao = 30;
        } else {
            diasDevolucao = 15;
        }

        const dataDevolucao = new Date();
        dataDevolucao.setDate(hoje.getDate() + diasDevolucao);

        const novoEmprestimo = new Emprestimo(
            this.emprestimoRepo.gerarNovoId(),
            usuario_id,
            estoque_id,
            hoje,
            dataDevolucao,
            null, // data_entrega
            0,    // dias_atraso
            null  // suspensao_ate
        );

        // Marcar exemplar como indisponível
        estoque.disponivel = false;
        this.estoqueRepo.atualizarEstoque(estoque);

        this.emprestimoRepo.salvarEmprestimo(novoEmprestimo);
        return novoEmprestimo;
    }


    registrarDevolucao(id: number): Emprestimo | undefined {
        const emprestimo = this.emprestimoRepo.buscarPorId(id);

        if (!emprestimo) {
            console.log("Empréstimo não encontrado.");
            return undefined;
        }

        const agora = new Date();
        emprestimo.data_entrega = agora;

        const diff = agora.getTime() - emprestimo.data_devolucao.getTime();
        const diasAtraso = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));

        emprestimo.dias_atraso = diasAtraso;

        if (diasAtraso > 0) {
            const suspensao = new Date();
            suspensao.setDate(agora.getDate() + diasAtraso * 3);
            emprestimo.suspensao_ate = suspensao;
        } else {
            emprestimo.suspensao_ate = null;
        }

        this.emprestimoRepo.atualizarEmprestimo(emprestimo);
        return emprestimo;
    }

    listarEmprestimos(): Emprestimo[] {
        return this.emprestimoRepo.listarEmprestimos();
    }
}
