
import express from "express";
import { UsuarioController } from './controller/UsuarioController';
import { CategoriaUsuarioController } from "./controller/CategoriaUsuarioController";
import { CategoriaCursoController } from "./controller/CategoriaCursoController";
import { LivroController } from "./controller/LivroController";
import { CategoriaLivroController } from "./controller/CategoriaLivroController";
import { EstoqueController } from "./controller/EstoqueController";
import { EmprestimoController } from "./controller/EmprestimoController";
import { CategoriaCursoRepository } from "./repository/CategoriaCursoRepository";
import { CategoriaCurso } from "./model/CategoriaCurso";
import { CategoriaLivroRepository } from "./repository/CategoriaLivroRepository";
import { CategoriaLivro } from "./model/CategoriaLivro";
import { CategoriaUsuarioRepository } from "./repository/CategoriaUsuarioRepository";
import { CategoriaUsuario } from "./model/CategoriaUsuario";

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
app.get("/library/usuarios", usuarioController.listar.bind(usuarioController));
app.get("/library/usuarios/:cpf", usuarioController.detalharUsuario.bind(usuarioController));
app.put("/library/usuarios/:cpf", usuarioController.atualizarNovoUsuario.bind(usuarioController));
app.delete("/library/usuarios/:cpf", usuarioController.removerUsuario.bind(usuarioController));

//Livro
app.post("/library/livros", livroController.criarLivro.bind(livroController));
app.get("/library/livros", livroController.listar.bind(livroController));
app.get("/library/livros/:isbn", livroController.detalharNovoLivro.bind(livroController));
app.put("/library/livros/:isbn", livroController.atualizarNovoLivro.bind(livroController));
app.delete("/library/livros/:isbn", livroController.removerLivro.bind(livroController));

//Estoque
app.post("/library/estoque", estoqueController.criarExemplar.bind(estoqueController));
app.get("/library/estoque", estoqueController.listar.bind(estoqueController));
app.get("/library/estoque/:codigo", estoqueController.detalharNovoExemplar.bind(estoqueController));
app.put("/library/estoque/:codigo", estoqueController.atualizarNovoExemplar.bind(estoqueController));
app.delete("/library/estoque/:codigo", estoqueController.removerExemplar.bind(estoqueController));

//Emprestimo 
app.post("/library/emprestimos", emprestimoController.criarEmprestimo.bind(emprestimoController));
app.get("/library/emprestimos", emprestimoController.listar.bind(emprestimoController));
app.put("/library/emprestimos/:id/devolucao", emprestimoController.CriarDevolucao.bind(emprestimoController));

//Catalogos
app.get("/library/categorias-usuario", catUsuController.listar.bind(catUsuController));
app.get("/library/cursos", cursoController.listar.bind(cursoController));
app.get("/library/categorias-livro", categoriaLivroController.listar.bind(categoriaLivroController));
app.get("/", (req, res) => {
  console.log(" Rota raiz chamada");
  res.send("API está rodando ");
});


// Populando categorias de curso
const cursoRepo = CategoriaCursoRepository.getInstance();
cursoRepo.popularMock();

// Populando categorias de livro

const livroCatRepo = CategoriaLivroRepository.getInstance();
livroCatRepo.popularMock();

// Populando categorias de usuário
const usuarioCatRepo = CategoriaUsuarioRepository.getInstance();
usuarioCatRepo.popularMock();

app.listen(PORT, () => console.log("Servidor rodando em http://localhost:3090"));


