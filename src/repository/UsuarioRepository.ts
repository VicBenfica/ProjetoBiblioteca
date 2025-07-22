import { Usuario } from "../model/Usuario"

export class UsuarioRepository {
    private static instance: UsuarioRepository;
    private usuarios: Usuario[] = [];

    private constructor() { }

    public static getInstance(): UsuarioRepository {
        if (!this.instance) {
            this.instance = new UsuarioRepository();
        }
        return this.instance;
    }

    InserirUsuario(usuario: Usuario) {
        this.usuarios.push(usuario);
    }

    buscarUsuarioPorCPF(cpf: number): Usuario | undefined {
        return this.usuarios.find(usuario => usuario.cpf === cpf);
    }
    removeUsuarioPorCPF(cpf: number) {
        const index = this.findIndex(cpf);
        return this.usuarios.splice(index, 1);
    }

    atualizarUsuarioPorCPF(cpf: number, novosDados: any) {
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

    listarUsuarios(): Usuario[] {
        return this.usuarios;
    }

    validacaoCadastro(cpf: number): boolean {
        return this.buscarUsuarioPorCPF(cpf) !== undefined;
    }

    private findIndex(cpf: number): number {
        const index = this.usuarios.findIndex(user => user.cpf == cpf);

        if (index == -1) {
            throw new Error("CPF informado não foi encontrado!");
        }

        return index;
    }

}