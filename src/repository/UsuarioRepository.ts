import { Usuario }  from "../model/Usuario";
import { Emprestimo }  from "../model/Emprestimo";


    type DadosAtualizacaoUsuario = {
    id?: number;
    nome?: string;
    cpf?: string;
    ativo?: boolean;
    categoria_id?: number;
    curso_id?:number;
    status?: 'ativo' | 'inativo' | 'suspenso';
    diaSuspensao?: number;
    }

export class UsuarioRepository {
    private static instance: UsuarioRepository;
    private usuarios: Usuario[] = [];

    private constructor() {}

    public static getInstance(): UsuarioRepository {
        if (!this.instance) {
        this.instance = new UsuarioRepository();
    }
    return this.instance;
    }

    insereUsuario(Usuario: Usuario){
    this.usuarios.push(Usuario);
    }

    removeUsuarioPorCpf(cpf: string, emprestimos: Emprestimo[]): boolean {
    const usuario = this.usuarios.find(u => u.cpf === cpf);
    if (!usuario) {
        return false; // usuário não encontrado
    }

    // Verifica se o usuário tem algum empréstimo em aberto (sem data_entrega)
    const possuiEmprestimosAtivos = emprestimos.some(e => e.usuario_id === usuario.id && !e.data_entrega);

    if (possuiEmprestimosAtivos) {
        return false; // não pode remover se ainda há livros emprestados
    }

    // Remove usuário
    const index = this.usuarios.findIndex(u => u.cpf === cpf);
    this.usuarios.splice(index, 1);
    return true;
    }


     




    listarUsuarios():Usuario[]{
    return this.usuarios;
    }
    
    filtraUsuarioPorCpf(cpf:string): Usuario|undefined{
    return this.usuarios.find(Usuario => Usuario.cpf === cpf);
    }

    atualizarUsuario(cpf: string, novosDados: DadosAtualizacaoUsuario): Usuario | undefined {
    const index = this.usuarios.findIndex(u => u.cpf === cpf);
    if (index === -1) {
        return undefined;
    }

    const usuarioAtual = this.usuarios[index];

    const usuarioAtualizado: Usuario = {
        id: novosDados.id !== undefined ? novosDados.id : usuarioAtual.id,
        nome: novosDados.nome !== undefined ? novosDados.nome : usuarioAtual.nome,
        cpf: novosDados.cpf !== undefined ? novosDados.cpf : usuarioAtual.cpf,
        ativo: novosDados.ativo !== undefined ? novosDados.ativo : usuarioAtual.ativo,
        categoria_id: novosDados.categoria_id !== undefined ? novosDados.categoria_id : usuarioAtual.categoria_id,
        curso_id: novosDados.curso_id !== undefined ? novosDados.curso_id : usuarioAtual.curso_id,
        status: novosDados.status !== undefined ? novosDados.status : usuarioAtual.status,
        diaSuspensao: novosDados.diaSuspensao !== undefined ? novosDados.diaSuspensao : usuarioAtual.diaSuspensao,
    };

    this.usuarios[index] = usuarioAtualizado;
    return usuarioAtualizado;
    }

    detalhesUsuarioPorCpf(cpf: string): Usuario | undefined {
    for (let i = 0; i < this.usuarios.length; i++) {
    const usuario = this.usuarios[i];
    if (usuario.cpf === cpf) {
      return {
        id: usuario.id,
        nome: usuario.nome,
        cpf: usuario.cpf,
        ativo: usuario.ativo,
        categoria_id: usuario.categoria_id,
        curso_id: usuario.curso_id,
        status: usuario.status,
        diaSuspensao: usuario.diaSuspensao
      };
    }
  }
  return undefined;
}

}

    

  