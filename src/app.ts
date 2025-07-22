import express from "express";
import { UsuarioController } from './controller/UsuarioController';
import { CategoriaUsuarioController } from "./controller/CategoriaUsuarioController";
import { CategoriaCursoController } from "./controller/CategoriaCursoController";
import { LivroController } from "./controller/LivroController";
import { CategoriaLivroController } from "./controller/CategoriaLivroController";
import { EstoqueController } from "./controller/EstoqueController";
import { EmprestimoController } from "./controller/EmprestimoController";

const usuarioController = new UsuarioController();
const catUsuController = new CategoriaUsuarioController();
const cursoController = new CategoriaCursoController();
const livroController = new LivroController();
const categoriaLivroController = new CategoriaLivroController();
const estoqueController = new EstoqueController();
const emprestimoController = new EmprestimoController();

const app = express();

const PORT = process.env.PORT ?? 3090;
app.use(express.json());

//Usuário
app.post("/library/usuarios", usuarioController.criarUsuario.bind(usuarioController));
app.get("/library/usuarios", usuarioController.listarUsuarios.bind(usuarioController));
app.get("/library/usuarios/:cpf", usuarioController.filtrarUsuario.bind(usuarioController));
app.put("/library/usuarios/:cpf", usuarioController.atualizarUsuario.bind(usuarioController));
app.delete("/library/usuarios/:cpf", usuarioController.removerUsuario.bind(usuarioController));

//Livro
app.post("/library/livros", livroController.criarLivro.bind(livroController));
app.get("/library/livros", livroController.listarLivros.bind(livroController));
app.get("/library/livros/:isbn", livroController.filtrarLivro.bind(livroController));
app.put("/library/livros/:isbn", livroController.atualizarLivro.bind(livroController));
app.delete("/library/livros/:isbn", livroController.removerLivro.bind(livroController));

//Estoque
app.post("/library/estoque", estoqueController.adicionarLivroEstoque.bind(estoqueController));
app.get("/library/estoque", estoqueController.listarEstoque.bind(estoqueController));
app.get("/library/estoque/:codigo", estoqueController.filtrarLivroNoEstoque.bind(estoqueController));
app.put("/library/estoque/:codigo", estoqueController.atualizarDisponibildade.bind(estoqueController));
app.delete("/library/estoque/:codigo", estoqueController.removerLivroNoEstoque.bind(estoqueController));

//Emprestimo 
app.post("/library/emprestimos", emprestimoController.novoEmprestimo.bind(emprestimoController));
app.get("/library/emprestimos", emprestimoController.listarEmprestimos.bind(emprestimoController));
app.put("/library/emprestimos/:id/devolucao", emprestimoController.registrarDevolucao.bind(emprestimoController));

//Catalogos
app.get("/library/categorias-usuario", catUsuController.listarCategoriaUsuario.bind(catUsuController));
app.get("/library/cursos", cursoController.listarCurso.bind(cursoController));
app.get("/library/categorias-livro", categoriaLivroController.listarLivro.bind(categoriaLivroController));

app.listen(PORT, () => console.log("Servidor rodando em http://localhost:3090"));