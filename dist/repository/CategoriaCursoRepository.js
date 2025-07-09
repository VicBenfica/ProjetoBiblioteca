"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaCursoRepository = void 0;
const CategoriaCurso_1 = require("../model/CategoriaCurso");
//importa o model
class CategoriaCursoRepository {
    static instance;
    categoriaCursos = [];
    //armazena todos os cursos no categoriaCursos
    constructor() { }
    popularMock() {
        this.categoriaCursos = [
            new CategoriaCurso_1.CategoriaCurso(1, "ADS"),
            new CategoriaCurso_1.CategoriaCurso(2, "Pedagogia"),
            new CategoriaCurso_1.CategoriaCurso(3, "Administração")
        ];
        console.log("Cursos Mock populados:", this.categoriaCursos);
    }
    static getInstance() {
        //método para acessar a unica instancia da classe
        if (!this.instance) {
            this.instance = new CategoriaCursoRepository();
        }
        return this.instance;
    }
    listarCursos() {
        return this.categoriaCursos;
    }
    buscarPorId(id) {
        return this.categoriaCursos.find(c => c.id === id);
        //se encontrar retorna a categoria se não retorna undefined
    }
}
exports.CategoriaCursoRepository = CategoriaCursoRepository;
