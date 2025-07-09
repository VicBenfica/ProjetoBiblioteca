"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
class UsuarioRepository {
    static instance;
    //instancia
    usuarios = [];
    //array
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
    listarTodosUsuarios() {
        return this.usuarios;
    }
    //fiz dois com a mesma função, um para atualizar por id, usado no emprestimo
    atualizarUsuarioPorId(id, usuarioAtualizado) {
        const index = this.usuarios.findIndex(u => u.id === id);
        if (index !== -1) {
            this.usuarios[index] = usuarioAtualizado;
        }
    }
    //fiz dois com a mesma função, um para atualizar diretamente, usado no UsuarioService
    atualizarUsuarioDiretamente(index, usuarioAtualizado) {
        this.usuarios[index] = usuarioAtualizado;
    }
    listarUsuarioPorId(id) {
        return this.usuarios.find(usuario => usuario.id === id);
    } //detalha id, usado em emprestimo e usuario - emprestimo para registrar devolução
    detalhesUsuarioPorCpf(cpf) {
        return this.usuarios.find(u => u.cpf === cpf);
    } //usado em usuario - detalhar com cpf
    //Filtra o usuario com seu CPF - mesma função que a anterior - //usado em usuario, emprestimo - detalhar com cpf
    filtraUsuarioPorCpf(cpf) {
        return this.usuarios.find(usuario => usuario.cpf === cpf);
    }
    //busca o local do indice
    buscarIndexPorCpf(cpf) {
        return this.usuarios.findIndex(u => u.cpf === cpf);
    }
}
exports.UsuarioRepository = UsuarioRepository;
