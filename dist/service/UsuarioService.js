"use strict";
// src/service/UsuarioService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const Usuario_1 = require("../model/Usuario");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
const validador_1 = require("../utils/validador"); // Assumindo que este caminho está correto
class UsuarioService {
    usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance();
    idCounter = 1;
    novoUsuario(data) {
        // Validação de CPF
        if (!validador_1.Validador.validarCPFCompleto(data.cpf)) {
            throw new Error("CPF inválido.");
        }
        // Validação de campos obrigatórios
        // Se email não está no construtor de Usuario, não deve ser obrigatório aqui.
        // Se for para ter email, o Model Usuario precisa ser atualizado primeiro.
        if (!data.nome || !data.cpf || data.categoria_id === undefined || data.curso_id === undefined) { // REMOVIDO: !data.email
            throw new Error("Favor informar nome, cpf, categoria e curso."); // Mensagem ajustada
        }
        // Criação do usuário
        // Certifique-se que o construtor do Usuario em Usuario.ts não espera 'email'
        const usuario = new Usuario_1.Usuario(this.idCounter++, data.nome, data.cpf, 
        // data.email, // REMOVIDO: Se não está no construtor do Model Usuario
        data.categoria_id, // category_id aqui, não ativo
        data.curso_id // curso_id aqui
        );
        // O status 'ativo' é definido dentro do construtor de Usuario, não precisa ser passado aqui.
        this.usuarioRepository.insereUsuario(usuario);
        return usuario;
    }
    //remove apenas os usuarios que não tem emprestimos ativos
    removeUsuarioPorCpf(cpf, emprestimos) {
        const usuario = this.usuarioRepository.filtraUsuarioPorCpf(cpf);
        if (!usuario)
            return false;
        // se n tiver retorna false
        const possuiEmprestimosAtivos = emprestimos.some(e => e.usuario_id === usuario.id && !e.data_entrega); // se possuir emprestimo sem a data de entrega
        //o item ainda não foi devolvido.
        if (possuiEmprestimosAtivos)
            return false;
        // se tiver emprestimos ativos retona rfalse
        const index = this.usuarioRepository.buscarIndexPorCpf(cpf);
        if (index !== -1) {
            //se encontrar a posiçao chamar a funçao p remover
            this.usuarioRepository.removerPorIndex(index);
            return true;
        }
        return false;
    }
    atualizarUsuario(cpf, novosDados) {
        const index = this.usuarioRepository.buscarIndexPorCpf(cpf);
        if (index === -1)
            return undefined;
        // se n acha r a posição retoena indefined
        const usuarioAtual = this.usuarioRepository.listarTodosUsuarios()[index];
        //Pega o usuário original do array, com base no índice encontrado.
        const usuarioAtualizado = {
            id: novosDados.id ?? usuarioAtual.id,
            nome: novosDados.nome ?? usuarioAtual.nome,
            cpf: novosDados.cpf ?? usuarioAtual.cpf,
            categoria_id: novosDados.categoria_id ?? usuarioAtual.categoria_id,
            curso_id: novosDados.curso_id ?? usuarioAtual.curso_id,
            ativo: novosDados.ativo ?? usuarioAtual.ativo,
            diaSuspensao: novosDados.diaSuspensao ?? usuarioAtual.diaSuspensao,
        };
        // substirui o atigo pelo novo na msm posicao
        this.usuarioRepository.atualizarUsuarioDiretamente(index, usuarioAtualizado);
        return usuarioAtualizado;
    }
    detalhesUsuario(cpf) {
        return this.usuarioRepository.detalhesUsuarioPorCpf(cpf);
    }
    listar(id) {
        return this.usuarioRepository.listarUsuarioPorId(id);
    }
    listarTodos() {
        return this.usuarioRepository.listarTodosUsuarios();
    }
}
exports.UsuarioService = UsuarioService;
