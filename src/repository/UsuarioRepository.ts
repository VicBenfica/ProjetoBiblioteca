import { Usuario } from "../model/Usuario";
import { Emprestimo } from "../model/Emprestimo";

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
    buscarUsuarioPorId(id: number): Usuario | undefined {
        return this.usuarios.find(usuario => usuario.id === id);
    }

    atualizarUsuarioPorId(id: number, usuarioAtualizado: Usuario): void {
        const index = this.usuarios.findIndex(u => u.id === id);
        if (index !== -1) {
            this.usuarios[index] = usuarioAtualizado;
        }
    }




    insereUsuario(usuario: Usuario) {
        this.usuarios.push(usuario);
    }

    listarUsuarios(): Usuario[] {
        return this.usuarios;
    }



    atualizarUsuarioDiretamente(index: number, usuarioAtualizado: Usuario): void {
        this.usuarios[index] = usuarioAtualizado;
    }

    //Filtra o usuario com seu CPF
    filtraUsuarioPorCpf(cpf: string): Usuario | undefined {
        return this.usuarios.find(usuario => usuario.cpf === cpf);
    }
    //busca o local do indice
    buscarIndexPorCpf(cpf: string): number {
        return this.usuarios.findIndex(u => u.cpf === cpf);
    }

    removerPorIndex(index: number): void {
        this.usuarios.splice(index, 1);
    }

    detalhesUsuarioPorCpf(cpf: string): Usuario | undefined {
        return this.usuarios.find(u => u.cpf === cpf);
    }
}
