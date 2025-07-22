import { Usuario } from "../model/Usuario";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { CategoriaUsuarioService } from "./CategoriaUsuarioService";
import { CursoService } from "./CategoriaCursoService";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { CategoriaUsuario } from "../model/CategoriaUsuario";
import { CursoRepository } from "../repository/CategoriaCursoRepository";

export class UsuarioService{
    private usuarioRepository = UsuarioRepository.getInstance();
    private categoriaUsuarioRepository = CursoRepository.getInstance();
    private categoriaCursoRepository = CursoRepository.getInstance();
    private emprestimoRepository = EmprestimoRepository.getInstance();

    novoUsuario(data: any): Usuario{
        if(!this.categoriaUsuarioRepository.encontrarCurso(data.categoria)) {
            throw new Error("Por favor informar uma categoria existente");
        } 

        if(!this.categoriaCursoRepository.encontrarCurso(data.curso)){
            throw new Error("Por favor informar um curso existente");
        }

        if(this.usuarioRepository.validacaoCadastro(data.cpf)){
            throw new Error("Este usuário já é cadastrado!");
        } else{
            const usuario = new Usuario(data.nome, data.cpf, data.email, data.categoria, data.curso);

            this.usuarioRepository.InserirUsuario(usuario);

            return usuario;
        }
    }

    filtrarUsuario(data: any){
        const cpf = data.cpf;
        const usuario = this.usuarioRepository.buscarUsuarioPorCPF(cpf);

        if(!usuario){
            throw new Error("Este usuário ainda não foi cadastrado com este CPF!");
        }

        return usuario;
    }

    removeUsuario(cpf: number){
        const emprestimosAtivos = this.emprestimoRepository.filtraEmprestimosAtivosDoUsuario(cpf);
        if (emprestimosAtivos.length > 0) {
            throw new Error("Usuário não pode ser removido pois possui empréstimos pendentes!");
        }
        return this.usuarioRepository.removeUsuarioPorCPF(cpf);
    }

    listarUsuarios(){
        return this.usuarioRepository.listarUsuarios()
    }

    atualizaUsuario(data: any){
        const cpf = data.cpf;
        const novosDados = data.novosDados;

        return this.usuarioRepository.atualizarUsuarioPorCPF(cpf, novosDados);
    }

}