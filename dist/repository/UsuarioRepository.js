"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
class UsuarioRepository {
    static instance;
    usuarios = [];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new UsuarioRepository();
        }
        return this.instance;
    }
    insereUsuario(usuario) {
        this.usuarios.push(usuario);
    }
    removerPorIndex(index) {
        this.usuarios.splice(index, 1);
    }
    atualizarUsuarioDiretamente(index, usuarioAtualizado) {
        this.usuarios[index] = usuarioAtualizado;
    }
    detalhesUsuarioPorCpf(cpf) {
        return this.usuarios.find(u => u.cpf === cpf);
    }
    listarTodosUsuarios() {
        return this.usuarios;
    }
    atualizarUsuarioPorId(id, usuarioAtualizado) {
        const index = this.usuarios.findIndex(u => u.id === id);
        if (index !== -1) {
            this.usuarios[index] = usuarioAtualizado;
        }
    }
    listarUsuarioPorId(id) {
        return this.usuarios.find(usuario => usuario.id === id);
    }
    //Filtra o usuario com seu CPF
    filtraUsuarioPorCpf(cpf) {
        return this.usuarios.find(usuario => usuario.cpf === cpf);
    }
    //busca o local do indice
    buscarIndexPorCpf(cpf) {
        return this.usuarios.findIndex(u => u.cpf === cpf);
    }
}
exports.UsuarioRepository = UsuarioRepository;
