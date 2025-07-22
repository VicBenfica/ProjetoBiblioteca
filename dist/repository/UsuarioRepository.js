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
    InserirUsuario(usuario) {
        this.usuarios.push(usuario);
    }
    buscarUsuarioPorCPF(cpf) {
        return this.usuarios.find(usuario => usuario.cpf === cpf);
    }
    removeUsuarioPorCPF(cpf) {
        const index = this.findIndex(cpf);
        return this.usuarios.splice(index, 1);
    }
    atualizarUsuarioPorCPF(cpf, novosDados) {
        const index = this.findIndex(cpf);
        const usuario = this.usuarios[index];
        if (novosDados.nome) {
            usuario.nome = novosDados.nome;
        }
        if (novosDados.email) {
            usuario.email = novosDados.email;
        }
        if (novosDados.categoria) {
            usuario.categoria = novosDados.categoria;
        }
        if (novosDados.curso) {
            usuario.curso = novosDados.curso;
        }
        if (novosDados.status) {
            usuario.status = novosDados.status;
        }
        this.usuarios[index] = usuario;
        return usuario;
    }
    listarUsuarios() {
        return this.usuarios;
    }
    validacaoCadastro(cpf) {
        return this.buscarUsuarioPorCPF(cpf) !== undefined;
    }
    findIndex(cpf) {
        const index = this.usuarios.findIndex(user => user.cpf == cpf);
        if (index == -1) {
            throw new Error("CPF informado não foi encontrado!");
        }
        return index;
    }
}
exports.UsuarioRepository = UsuarioRepository;
