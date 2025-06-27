import { Emprestimo } from "../model/Emprestimo";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { Usuario } from "../model/Usuario";
import { LivroRepository } from "../repository/LivroRepository";
import { Livro } from "../model/Livro";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { Estoque } from "../model/Estoque";
import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";
import { CategoriaUsuario } from "../model/CategoriaUsuario";
import { CategoriaCursoRepository } from "../repository/CategoriaCursoRepository";
import { CategoriaCurso } from "../model/CategoriaCurso";
import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";
import { CategoriaLivro } from "../model/CategoriaLivro";


export class EmprestimoService {
    private emprestimoRepo = EmprestimoRepository.getInstance();
    private usuarioRepo = UsuarioRepository.getInstance();
    private estoqueRepo = EstoqueRepository.getInstance();
    private livroRepo = LivroRepository.getInstance();
    private categoriaUsuarioRepo = CategoriaUsuarioRepository.getInstance();
    private categoriaCursooRepo = CategoriaCursoRepository.getInstance();
    private categoriaLivroRepo = CategoriaLivroRepository.getInstance();


    registrarEmprestimoPorCpf(cpf: string, estoque_id: number): Emprestimo {
        const usuario = this.usuarioRepo.filtraUsuarioPorCpf(cpf);
        //buscar por cpf
        if (!usuario) throw new Error("Usuário não encontrado.");

        if (usuario.ativo !== "ativo") {
            throw new Error("Usuário inativo.");
        }

        const hoje = new Date();
        //Impede empréstimo se o usuário estiver suspenso.
        if (usuario.suspensao_ate && usuario.suspensao_ate > hoje) {
            throw new Error(`Usuário suspenso até ${usuario.suspensao_ate.toLocaleDateString()}.`);
            //para a data local
        }
        //Erro se o exemplar estiver insdiponivel ou nao for encontrado
        const estoque = this.estoqueRepo.buscarPorId(estoque_id);
        if (!estoque || !estoque.disponivel) {
            throw new Error("Exemplar não encontrado ou indisponível.");
        }
        //Erro aao encontoru o livro
        const livro = this.livroRepo.buscarLivroPorId(estoque.livro_id);
        if (!livro) {
            throw new Error("Livro vinculado não encontrado.");
        }

        // Corrigido: listar empréstimos do usuário
        const emprestimosAtivos = this.emprestimoRepo
            .listarEmprestimos()
            .filter(e => e.usuario_id === usuario.id && !e.data_entrega);
            //busca emprestimos do usuario que nao tem data de entrega 
        // Buscar categoria
        const categoriaUsuario = this.categoriaUsuarioRepo.buscarPorId(usuario.categoria_id);
        const curso = this.categoriaCursooRepo.buscarPorId(usuario.curso_id);
        const categoriaLivro = this.categoriaLivroRepo.buscarPorId(livro.categoria_id);



        if (!categoriaUsuario || !curso) {
            throw new Error("Categoria ou curso do usuário não encontrado.");
        }

        const limiteEmprestimos = categoriaUsuario.nome.toLowerCase() === "professor" ? 5 : 3;
        //minusculo
        // se for professor tem o limite de 5, se nao tem 3
        if (emprestimosAtivos.length >= limiteEmprestimos) {
            throw new Error(`Limite de ${limiteEmprestimos} empréstimos atingido.`);
        }

        // Regras de devolução

        let diasDevolucao = 15;

        if (categoriaUsuario.nome.toLowerCase() === "professor") {
            diasDevolucao = 40;
        } else if (
            categoriaUsuario.nome.toLowerCase() === "aluno" &&
            categoriaLivro &&
            categoriaLivro.nome &&
            curso &&
            curso.nome &&
            curso.nome.toLowerCase() === categoriaLivro.nome.toLowerCase()
        ) {
            diasDevolucao = 30;
        }
        //verifica se o usuario é um aluno, se existe uma categoria de livro valida, se tem o curso valido, se o aluno é da msm area q o livro





        const dataDevolucao = new Date();
        dataDevolucao.setDate(hoje.getDate() + diasDevolucao);
        //a data de devolução vai ser o dia atual + os dias de emprestimo
        //get pega  e set altera
        const novoEmprestimo = new Emprestimo(
            this.emprestimoRepo.gerarNovoId(),
            usuario.id,
            estoque_id,
            hoje,
            dataDevolucao,
            null, //data_entrega: ainda não devolveu
            0, // dias de atraso: 0
            null  // suspensao_ate: só se atrasar
            // é null p qianda n foi devolvido
        );
        //atualiza o o status do estoque
        estoque.disponivel = false;
        this.estoqueRepo.atualizarEstoque(estoque);
        this.emprestimoRepo.salvarEmprestimo(novoEmprestimo);
        //salva o novo emprestimo
        return novoEmprestimo;
    }

    //Registra entrega.

    //Calcula atraso e suspensão.

    //Libera exemplar no estoque.

    //Atualiza usuário se houver atraso.

    registrarDevolucao(emprestimo_id: number): Emprestimo {
        const emprestimo = this.emprestimoRepo.buscarPorId(emprestimo_id);

        if (!emprestimo) {
            throw new Error("Empréstimo não encontrado.");
        }

        const usuario = this.usuarioRepo.listarUsuarioPorId(emprestimo.usuario_id);
        if (!usuario) {
            throw new Error("Usuário vinculado ao empréstimo não encontrado.");
        }//Busca o usuario e o exemplar 

        const estoque = this.estoqueRepo.buscarPorId(emprestimo.estoque_id);
        if (!estoque) {
            throw new Error("Exemplar vinculado ao empréstimo não encontrado.");
        }

        // Data da entrega
        const hoje = new Date();
        emprestimo.data_entrega = hoje;

        // Cálculo de atraso
        const atrasoMs = hoje.getTime() - emprestimo.data_devolucao.getTime();
        const diasAtraso = atrasoMs > 0 ? Math.ceil(atrasoMs / (1000 * 60 * 60 * 24)) : 0;
        //mathceil arredonda p cima
        emprestimo.dias_atraso = diasAtraso;
        //Calcula a diferença entre a data de entrega real e a data esperada (data_devolucao).

        //Se houve atraso, converte o atraso de milissegundos para dias inteiros.

        if (diasAtraso > 0) {
            // Suspensão: 3 dias para cada dia de atraso
            const suspensao = new Date();
            suspensao.setDate(hoje.getDate() + diasAtraso * 3);
            //Atualiza a data de suspensao do emprestimo
            emprestimo.suspensao_ate = suspensao;

            // Atualiza usuário
            usuario.ativo = "suspenso";
            usuario.diaSuspensao = diasAtraso * 3;
            emprestimo.suspensao_ate = suspensao;
            this.usuarioRepo.atualizarUsuarioPorId(usuario.id, usuario);
        } else {
            //se n tiver atraso limpa a suspensao
            emprestimo.suspensao_ate = null;
        }

        // Torna o exemplar disponível novamente
        estoque.disponivel = true;
        this.estoqueRepo.atualizarEstoque(estoque);

        // Atualiza o empréstimo no repositorio
        this.emprestimoRepo.atualizarEmprestimo(emprestimo);

        return emprestimo;
    }

    listar() {
        return this.emprestimoRepo.listarEmprestimos();
    }
    buscar(id: number) {
        return this.emprestimoRepo.buscarPorId(id);
    }




}
