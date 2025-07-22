"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const Usuario_1 = require("../model/Usuario");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository");
const CategoriaCursoRepository_1 = require("../repository/CategoriaCursoRepository");
class UsuarioService {
    usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance();
    categoriaUsuarioRepository = CategoriaCursoRepository_1.CursoRepository.getInstance();
    categoriaCursoRepository = CategoriaCursoRepository_1.CursoRepository.getInstance();
    emprestimoRepository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
    novoUsuario(data) {
        if (!this.categoriaUsuarioRepository.encontrarCurso(data.categoria)) {
            throw new Error("Por favor informar uma categoria existente");
        }
        if (!this.categoriaCursoRepository.encontrarCurso(data.curso)) {
            throw new Error("Por favor informar um curso existente");
        }
        if (this.usuarioRepository.validacaoCadastro(data.cpf)) {
            throw new Error("Este usuário já é cadastrado!");
        }
        else {
            const usuario = new Usuario_1.Usuario(data.nome, data.cpf, data.email, data.categoria, data.curso);
            this.usuarioRepository.InserirUsuario(usuario);
            return usuario;
        }
    }
    filtrarUsuario(data) {
        const cpf = data.cpf;
        const usuario = this.usuarioRepository.buscarUsuarioPorCPF(cpf);
        if (!usuario) {
            throw new Error("Este usuário ainda não foi cadastrado com este CPF!");
        }
        return usuario;
    }
    removeUsuario(cpf) {
        const emprestimosAtivos = this.emprestimoRepository.filtraEmprestimosAtivosDoUsuario(cpf);
        if (emprestimosAtivos.length > 0) {
            throw new Error("Usuário não pode ser removido pois possui empréstimos pendentes!");
        }
        return this.usuarioRepository.removeUsuarioPorCPF(cpf);
    }
    listarUsuarios() {
        return this.usuarioRepository.listarUsuarios();
    }
    atualizaUsuario(data) {
        const cpf = data.cpf;
        const novosDados = data.novosDados;
        return this.usuarioRepository.atualizarUsuarioPorCPF(cpf, novosDados);
    }
}
exports.UsuarioService = UsuarioService;
