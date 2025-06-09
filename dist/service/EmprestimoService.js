"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoService = void 0;
const Emprestimo_1 = require("../model/Emprestimo");
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
const LivroRepository_1 = require("../repository/LivroRepository");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const CategoriaUsuarioRepository_1 = require("../repository/CategoriaUsuarioRepository");
const CategoriaCursoRepository_1 = require("../repository/CategoriaCursoRepository");
const CategoriaLivroRepository_1 = require("../repository/CategoriaLivroRepository");
class EmprestimoService {
    emprestimoRepo = EmprestimoRepository_1.EmprestimoRepository.getInstance();
    usuarioRepo = UsuarioRepository_1.UsuarioRepository.getInstance();
    estoqueRepo = EstoqueRepository_1.EstoqueRepository.getInstance();
    livroRepo = LivroRepository_1.LivroRepository.getInstance();
    categoriaUsuarioRepo = CategoriaUsuarioRepository_1.CategoriaUsuarioRepository.getInstance();
    categoriaCursooRepo = CategoriaCursoRepository_1.CategoriaCursoRepository.getInstance();
    categoriaLivroRepo = CategoriaLivroRepository_1.CategoriaLivroRepository.getInstance();
    registrarEmprestimoPorCpf(cpf, estoque_id) {
        const usuario = this.usuarioRepo.filtraUsuarioPorCpf(cpf);
        if (!usuario)
            throw new Error("Usuário não encontrado.");
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
        }
        else if (categoriaUsuario.nome.toLowerCase() === "aluno" &&
            categoriaLivro &&
            categoriaLivro.nome &&
            curso &&
            curso.nome &&
            curso.nome.toLowerCase() === categoriaLivro.nome.toLowerCase()) {
            diasDevolucao = 30;
        }
        const dataDevolucao = new Date();
        dataDevolucao.setDate(hoje.getDate() + diasDevolucao);
        const novoEmprestimo = new Emprestimo_1.Emprestimo(this.emprestimoRepo.gerarNovoId(), usuario.id, estoque_id, hoje, dataDevolucao, null, 0, null);
        estoque.disponivel = false;
        this.estoqueRepo.atualizarEstoque(estoque);
        this.emprestimoRepo.salvarEmprestimo(novoEmprestimo);
        return novoEmprestimo;
    }
    registrarDevolucao(emprestimo_id) {
        const emprestimo = this.emprestimoRepo.buscarPorId(emprestimo_id);
        if (!emprestimo) {
            throw new Error("Empréstimo não encontrado.");
        }
        const usuario = this.usuarioRepo.listarUsuarioPorId(emprestimo.usuario_id);
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
        }
        else {
            emprestimo.suspensao_ate = null;
        }
        // Torna o exemplar disponível novamente
        estoque.disponivel = true;
        this.estoqueRepo.atualizarEstoque(estoque);
        // Atualiza o empréstimo
        this.emprestimoRepo.atualizarEmprestimo(emprestimo);
        return emprestimo;
    }
    listar() {
        return this.emprestimoRepo.listarEmprestimos();
    }
    buscar(id) {
        return this.emprestimoRepo.buscarPorId(id);
    }
}
exports.EmprestimoService = EmprestimoService;
