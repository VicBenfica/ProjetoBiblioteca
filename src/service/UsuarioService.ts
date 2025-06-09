
import { Usuario } from "../model/Usuario";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { Emprestimo } from "../model/Emprestimo";

type DadosAtualizacaoUsuario = {
    id?: number;
    nome?: string;
    cpf?: string;
    categoria_id?: number;
    curso_id?: number;
    ativo?: 'ativo' | 'inativo' | 'suspenso';
    diaSuspensao?: number;
};

export class UsuarioService {
    private usuarioRepository = UsuarioRepository.getInstance();
    private idCounter = 1; // contador local


    novoUsuario(data: any): Usuario {
        // Validação de campos obrigatórios
        if (!data.nome || !data.cpf || !data.email || data.categoria_id === undefined || data.curso_id === undefined) {
            throw new Error("Favor informar nome, cpf, email, categoria e curso.");
        }

        // Criação do usuário
        const usuario = new Usuario(
            this.idCounter++,
            data.nome,
            data.cpf,
            data.email,
            data.categoria_id,
            data.curso_id     // status inicial
        );                  // dia de suspensão

        // Inserção no repositório
        this.usuarioRepository.insereUsuario(usuario);

        return usuario;
    }

    removeUsuarioPorCpf(cpf: string, emprestimos: Emprestimo[]): boolean {
        const usuario = this.usuarioRepository.filtraUsuarioPorCpf(cpf);
        if (!usuario) return false;

        const possuiEmprestimosAtivos = emprestimos.some(
            e => e.usuario_id === usuario.id && !e.data_entrega
        );

        if (possuiEmprestimosAtivos) return false;

        const index = this.usuarioRepository.buscarIndexPorCpf(cpf);
        if (index !== -1) {
            this.usuarioRepository.removerPorIndex(index);
            return true;
        }

        return false;
    }

    atualizarUsuario(cpf: string, novosDados: DadosAtualizacaoUsuario): Usuario | undefined {
        const index = this.usuarioRepository.buscarIndexPorCpf(cpf);
        if (index === -1) return undefined;

        const usuarioAtual = this.usuarioRepository.listarTodosUsuarios()[index];

        const usuarioAtualizado: Usuario = {
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

    detalhesUsuario(cpf: string): Usuario | undefined {
        return this.usuarioRepository.detalhesUsuarioPorCpf(cpf);
    }
    listar(id: number) {
        return this.usuarioRepository.listarUsuarioPorId(id);
    }
    listarTodos(): Usuario[] {
        return this.usuarioRepository.listarTodosUsuarios();
    }

}
