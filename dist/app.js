"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UsuarioController_1 = require("./controller/UsuarioController");
const CategoriaUsuarioController_1 = require("./controller/CategoriaUsuarioController");
const CategoriaCursoController_1 = require("./controller/CategoriaCursoController");
const LivroController_1 = require("./controller/LivroController");
const CategoriaLivroController_1 = require("./controller/CategoriaLivroController");
const EstoqueController_1 = require("./controller/EstoqueController");
const EmprestimoController_1 = require("./controller/EmprestimoController");
const usuarioController = new UsuarioController_1.UsuarioController();
const catUsuController = new CategoriaUsuarioController_1.CategoriaUsuarioController();
const cursoController = new CategoriaCursoController_1.CategoriaCursoController();
const livroController = new LivroController_1.LivroController();
const categoriaLivroController = new CategoriaLivroController_1.CategoriaLivroController();
const estoqueController = new EstoqueController_1.EstoqueController();
const emprestimoController = new EmprestimoController_1.EmprestimoController();
const app = (0, express_1.default)();
const PORT = process.env.PORT ?? 3090;
app.use(express_1.default.json());
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
