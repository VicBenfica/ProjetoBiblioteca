"use strict";
// src/controller/EmprestimoController.ts
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
exports.EmprestimoController = void 0;
const tsoa_1 = require("tsoa");
const EmprestimoService_1 = require("../service/EmprestimoService");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const EmprestimoDto_1 = require("../model/dto/EmprestimoDto");
//importa a Dto
let EmprestimoController = class EmprestimoController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.emprestimoService = new EmprestimoService_1.EmprestimoService();
    }
    //ENDPOINTS
    async criarEmprestimo(dto, fail, success) {
        try {
            const { cpfUsuario, codigoExemplar } = dto;
            const emprestimo = this.emprestimoService.registrarEmprestimo(cpfUsuario, codigoExemplar);
            return success(201, new BasicResponseDto_1.BasicResponseDto("Empréstimo realizado com sucesso", emprestimo));
        }
        catch (error) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message || "Erro ao registrar empréstimo", undefined));
        }
    }
    async listarEmprestimos(fail, success) {
        try {
            const emprestimos = this.emprestimoService.listarEmprestimos();
            return success(200, new BasicResponseDto_1.BasicResponseDto("Lista de empréstimos", emprestimos));
        }
        catch (error) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message || "Erro ao listar empréstimos", undefined));
        }
    }
    async registrarDevolucao(id, fail, success) {
        try {
            const emprestimo = this.emprestimoService.registrarDevolucao(id);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Devolução registrada com sucesso", emprestimo));
        }
        catch (error) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message || "Erro ao registrar devolução", undefined));
        }
    }
};
exports.EmprestimoController = EmprestimoController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EmprestimoDto_1.Emprestimo, Function, Function]),
    __metadata("design:returntype", Promise)
], EmprestimoController.prototype, "criarEmprestimo", null);
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], EmprestimoController.prototype, "listarEmprestimos", null);
__decorate([
    (0, tsoa_1.Put)("{id}/devolucao"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], EmprestimoController.prototype, "registrarDevolucao", null);
exports.EmprestimoController = EmprestimoController = __decorate([
    (0, tsoa_1.Route)("emprestimos")
    //DEFINE AS ROTAS
    ,
    (0, tsoa_1.Tags)("Emprestimos")
], EmprestimoController);
