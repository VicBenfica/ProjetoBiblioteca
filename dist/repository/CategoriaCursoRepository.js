"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoRepository = void 0;
const CategoriaCurso_1 = require("../model/CategoriaCurso");
//importa o model
class CursoRepository {
    static instance;
    cursos = [];
    constructor() {
        this.cursos.push(new CategoriaCurso_1.CategoriaCurso("ADS"));
        this.cursos.push(new CategoriaCurso_1.CategoriaCurso("Pedagogia"));
        this.cursos.push(new CategoriaCurso_1.CategoriaCurso("Administração"));
    }
    ;
    static getInstance() {
        if (!this.instance) {
            this.instance = new CursoRepository();
        }
        return this.instance;
    }
    listarCursos() {
        return this.cursos;
    }
    encontrarCurso(cur) {
        return this.cursos.find(curso => curso.nome === cur);
    }
}
exports.CursoRepository = CursoRepository;
