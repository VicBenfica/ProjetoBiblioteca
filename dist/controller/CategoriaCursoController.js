"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoController = void 0;
const CategoriaCursoService_1 = require("../service/CategoriaCursoService");
const tsoa_1 = require("tsoa");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
//importa a DTO que será usada para padronizar a API
let CursoController = class CursoController {
    constructor() {
        this.cursoService = new CategoriaCursoService_1.CursoService();
    }
    //endpoint do Tsoa, @Res é a resposta
    async listarCurso(fail, success) {
        try {
            const lista = await this.cursoService.listarCursos();
            return success(200, new BasicResponseDto_1.BasicResponseDto("Cursos Disponiveis: ", lista));
        }
        catch (err) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
        }
    }
};
exports.CursoController = CursoController;
__decorate([
    (0, tsoa_1.Get)()
    //endpoint do Tsoa, @Res é a resposta
    ,
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], CursoController.prototype, "listarCurso", null);
exports.CursoController = CursoController = __decorate([
    (0, tsoa_1.Route)("categoria-cursos")
    //Define as rotas
    ,
    (0, tsoa_1.Tags)("Cursos Disponiveis")
    //importa os decorators do tsoa
], CursoController);
