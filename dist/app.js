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
app.listen(PORT, () => console.log("Servidor rodando em http://localhost:3090"));
