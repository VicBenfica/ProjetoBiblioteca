"use strict";
// src/service/EmprestimoService.ts
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
    // ALTERADO: estoque_id para estoque_codigo
    registrarEmprestimoPorCpf(cpf, estoque_codigo) {
        const usuario = this.usuarioRepo.filtraUsuarioPorCpf(cpf);
        if (!usuario)
            throw new Error("Usuário não encontrado.");
        const hoje = new Date();
        // Lógica de ativação automática do usuário
        if (usuario.ativo === "suspenso" && usuario.suspensao_ate && usuario.suspensao_ate < hoje) {
            usuario.ativo = "ativo";
            usuario.suspensao_ate = null;
            usuario.diaSuspensao = 0;
            this.usuarioRepo.atualizarUsuarioPorId(usuario.id, usuario);
            console.log(`Usuário ${usuario.nome} (CPF: ${usuario.cpf}) ativado automaticamente.`);
        }
        if (usuario.ativo !== "ativo") {
            throw new Error(`Usuário inativo ou suspenso (status atual: ${usuario.ativo}).`);
        }
        if (usuario.suspensao_ate && usuario.suspensao_ate > hoje) {
            throw new Error(`Usuário suspenso até ${usuario.suspensao_ate.toLocaleDateString()}.`);
        }
        // Buscar exemplar por código e verificar status/disponibilidade
        const exemplar = this.estoqueRepo.buscarPorCodigo(estoque_codigo); // ALTERADO: buscarPorCodigo
        if (!exemplar || exemplar.status !== 'disponivel' || exemplar.quantidade_emprestada >= exemplar.quantidade) {
            throw new Error("Exemplar não encontrado ou indisponível para empréstimo.");
        }
        // Buscar livro por ISBN do exemplar
        const livro = this.livroRepo.buscarLivroPorIsbn(exemplar.livro_isbn); // ALTERADO: buscarLivroPorIsbn
        if (!livro) {
            throw new Error("Livro vinculado ao exemplar não encontrado.");
        }
        const emprestimosAtivos = this.emprestimoRepo
            .listarEmprestimos()
            .filter(e => e.usuario_id === usuario.id && !e.data_entrega);
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
        const novoEmprestimo = new Emprestimo_1.Emprestimo(this.emprestimoRepo.gerarNovoId(), usuario.id, estoque_codigo, // Passa o estoque_codigo para o empréstimo
        hoje, dataDevolucao, null, // data_entrega
        0, // dias de atraso
        null // suspensao_ate
        );
        // Atualizar o exemplar: incrementar quantidade_emprestada e ajustar status
        exemplar.quantidade_emprestada++;
        exemplar.status = (exemplar.quantidade_emprestada >= exemplar.quantidade) ? 'emprestado' : 'disponivel';
        this.estoqueRepo.atualizarEstoque(exemplar); // Persiste a mudança no exemplar
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
        // Buscar exemplar por estoque_codigo
        const exemplar = this.estoqueRepo.buscarPorCodigo(emprestimo.estoque_codigo); // ALTERADO: buscarPorCodigo
        if (!exemplar) {
            throw new Error("Exemplar vinculado ao empréstimo não encontrado.");
        }
        const hoje = new Date();
        emprestimo.data_entrega = hoje;
        if (!(emprestimo.data_devolucao instanceof Date)) {
            console.error("Erro: emprestimo.data_devolucao não é uma instância de Date.", emprestimo.data_devolucao);
            throw new Error("Dados do empréstimo inválidos: data de devolução não é uma data.");
        }
        const atrasoMs = hoje.getTime() - emprestimo.data_devolucao.getTime();
        const diasAtraso = atrasoMs > 0 ? Math.ceil(atrasoMs / (1000 * 60 * 60 * 24)) : 0;
        emprestimo.dias_atraso = diasAtraso;
        if (diasAtraso > 0) {
            const suspensao = new Date();
            suspensao.setDate(hoje.getDate() + diasAtraso * 3);
            emprestimo.suspensao_ate = suspensao;
            usuario.ativo = "suspenso";
            usuario.diaSuspensao = diasAtraso * 3;
            // Remover linha duplicada: emprestimo.suspensao_ate = suspensao;
            this.usuarioRepo.atualizarUsuarioPorId(usuario.id, usuario);
        }
        else {
            emprestimo.suspensao_ate = null;
        }
        // Atualizar o exemplar: decrementar quantidade_emprestada e ajustar status
        exemplar.quantidade_emprestada--;
        exemplar.status = (exemplar.quantidade_emprestada < exemplar.quantidade) ? 'disponivel' : 'emprestado';
        this.estoqueRepo.atualizarEstoque(exemplar); // Persiste a mudança no exemplar
        this.emprestimoRepo.atualizarEmprestimo(emprestimo);
        return emprestimo;
    }
    listar() {
        return this.emprestimoRepo.listarEmprestimos();
    }
    buscar(id) {
        return this.emprestimoRepo.buscarPorId(id);
    }
    // Este método buscarLivroPorIsbn está no EmprestimoService mas busca um LIVRO.
    // Verifique se ele é realmente usado aqui ou se seria mais apropriado no LivroService.
    // Deixei aqui por ser o que foi passado.
    buscarLivroPorIsbn(isbn) {
        return this.livroRepo.buscarLivroPorIsbn(isbn);
    }
}
exports.EmprestimoService = EmprestimoService;
