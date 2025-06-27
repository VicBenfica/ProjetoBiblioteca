import { Usuario } from "../model/Usuario";
import { Emprestimo } from "../model/Emprestimo";

export class UsuarioRepository {
    private static instance: UsuarioRepository;
    //instancia
    private usuarios: Usuario[] = [];
    //array
    private constructor() { }

    public static getInstance(): UsuarioRepository {
        if (!this.instance) {
            this.instance = new UsuarioRepository();
        }
        return this.instance;
    }
    insereUsuario(usuario: Usuario) {
        this.usuarios.push(usuario);
    }
    removerPorIndex(index: number): void {
        this.usuarios.splice(index, 1);
    }
    

    
    listarTodosUsuarios(): Usuario[] {
        return this.usuarios;
    }
    //fiz dois com a mesma função, um para atualizar por id, usado no emprestimo
    atualizarUsuarioPorId(id: number, usuarioAtualizado: Usuario): void {
        const index = this.usuarios.findIndex(u => u.id === id);
        if (index !== -1) {
            this.usuarios[index] = usuarioAtualizado;
        }
    }    
    //fiz dois com a mesma função, um para atualizar diretamente, usado no UsuarioService

    atualizarUsuarioDiretamente(index: number, usuarioAtualizado: Usuario): void {
        this.usuarios[index] = usuarioAtualizado;
    }

    listarUsuarioPorId(id: number): Usuario | undefined {
        return this.usuarios.find(usuario => usuario.id === id);
    }//detalha id, usado em emprestimo e usuario - emprestimo para registrar devolução

    detalhesUsuarioPorCpf(cpf: string): Usuario | undefined {
        return this.usuarios.find(u => u.cpf === cpf);
    }//usado em usuario - detalhar com cpf

    //Filtra o usuario com seu CPF - mesma função que a anterior - //usado em usuario, emprestimo - detalhar com cpf
    filtraUsuarioPorCpf(cpf: string): Usuario | undefined {
        return this.usuarios.find(usuario => usuario.cpf === cpf);
    }
    //busca o local do indice
    buscarIndexPorCpf(cpf: string): number {
        return this.usuarios.findIndex(u => u.cpf === cpf);
    }




}
