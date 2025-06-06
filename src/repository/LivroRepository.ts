import { Livro }  from "../model/Livro";
import { Estoque }  from "../model/Estoque";

export class LivroRepository {
    private static instance: LivroRepository;
    private livros: Livro[] = [];


    private constructor() {}

    public static getInstance(): LivroRepository {
        if (!this.instance) {
        this.instance = new LivroRepository();
    }
    return this.instance;
    }

    insereLivro(Livro: Livro){
        this.livros.push(Livro);
        }
    
    removeLivro(id: number, estoque: Estoque[]): boolean {
    // Verifica se existe algum exemplar emprestado
    const emprestado = estoque.some(e => e.livro_id === id && e.quantidade_emprestada > 0);

    if (emprestado) {
        console.log("Não é possível remover: o livro possui exemplares emprestados.");
        return false;
    }

    // Encontra o índice do livro na lista
    const index = this.livros.findIndex(l => l.id === id);
    if (index === -1) {
        console.log("Livro não encontrado.");
        return false;
    }

    this.livros.splice(index, 1);
    console.log("Livro removido com sucesso.");
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