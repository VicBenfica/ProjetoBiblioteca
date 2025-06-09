"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const Usuario_1 = require("../model/Usuario");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
class UsuarioService {
    usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance();
    idCounter = 1; // contador local
    novoUsuario(data) {
        // Validação de campos obrigatórios
        if (!data.nome || !data.cpf || !data.email || data.categoria_id === undefined || data.curso_id === undefined) {
            throw new Error("Favor informar nome, cpf, email, categoria e curso.");
        }
        // Criação do usuário
        const usuario = new Usuario_1.Usuario(this.idCounter++, data.nome, data.cpf, data.email, data.categoria_id, data.curso_id // status inicial
        ); // dia de suspensão
        // Inserção no repositório
        this.usuarioRepository.insereUsuario(usuario);
        return usuario;
    }
    removeUsuarioPorCpf(cpf, emprestimos) {
        const usuario = this.usuarioRepository.filtraUsuarioPorCpf(cpf);
        if (!usuario)
            return false;
        const possuiEmprestimosAtivos = emprestimos.some(e => e.usuario_id === usuario.id && !e.data_entrega);
        if (possuiEmprestimosAtivos)
            return false;
        const index = this.usuarioRepository.buscarIndexPorCpf(cpf);
        if (index !== -1) {
            this.usuarioRepository.removerPorIndex(index);
            return true;
        }
        return false;
    }
    atualizarUsuario(cpf, novosDados) {
        const index = this.usuarioRepository.buscarIndexPorCpf(cpf);
        if (index === -1)
            return undefined;
        const usuarioAtual = this.usuarioRepository.listarTodosUsuarios()[index];
        const usuarioAtualizado = {
            id: novosDados.id ?? usuarioAtual.id,
            nome: novosDados.nome ?? usuarioAtual.nome,
            cpf: novosDados.cpf ?? usuarioAtual.cpf,
            categoria_id: novosDados.categoria_id ?? usuarioAtual.categoria_id,
            curso_id: novosDados.curso_id ?? usuarioAtual.curso_id,
            ativo: novosDados.ativo ?? usuarioAtual.ativo,
            diaSuspensao: novosDados.diaSuspensao ?? usuarioAtual.diaSuspensao,
        };
        this.usuarioRepository.atualizarUsuarioDiretamente(index, usuarioAtualizado);
        return usuarioAtualizado;
    }
    detalhesUsuario(cpf) {
        return this.usuarioRepository.detalhesUsuarioPorCpf(cpf);
    }
    listar(id) {
        return this.usuarioRepository.listarUsuarioPorId(id);
    }
}
exports.UsuarioService = UsuarioService;
