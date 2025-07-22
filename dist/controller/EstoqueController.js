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
exports.EstoqueController = void 0;
const EstoqueService_1 = require("../service/EstoqueService");
const tsoa_1 = require("tsoa");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const LivroDto_1 = require("../model/dto/LivroDto");
let EstoqueController = class EstoqueController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.estoqueService = new EstoqueService_1.EstoqueService();
    }
    async adicionarLivroNoEstoque(dto, fail, success) {
        try {
            const livro = await this.estoqueService.cadastrarExemplar(dto.id, dto.isbn);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Livro adicionado com sucesso!", livro));
        }
        catch (err) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
        }
    }
    async listarEstoque(fail, success) {
        try {
            const lista = await this.estoqueService.listarDisponiveis();
            return success(202, new BasicResponseDto_1.BasicResponseDto("Lista do seu estoque: ", lista));
        }
        catch (err) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
        }
    }
    async filtrarLivroNoEstoque(id, fail, success) {
        try {
            const resultado = await this.estoqueService.buscarExemplar(Number(id));
            return success(200, new BasicResponseDto_1.BasicResponseDto("Livro no estoque foi encontrado com sucesso!", resultado));
        }
        catch (err) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
        }
    }
    async atualizarDisponibilidade(id, dto, fail, success) {
        try {
            if (!dto.status) {
                return fail(400, new BasicResponseDto_1.BasicResponseDto("Campo 'status' é obrigatório.", undefined));
            }
            const disponibilidadeAtualizada = this.estoqueService.atualizarStatus(id, dto.status);
            if (!disponibilidadeAtualizada) {
                return fail(400, new BasicResponseDto_1.BasicResponseDto("Não foi possível atualizar o status, exemplar não encontrado.", undefined));
            }
            return success(200, new BasicResponseDto_1.BasicResponseDto("Disponibilidade atualizada com sucesso!", disponibilidadeAtualizada));
        }
        catch (err) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
        }
    }
    async removerLivroNoEstoque(id, fail, success) {
        try {
            const livroRemovido = await this.estoqueService.removerExemplar(id);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Exemplar Deletado com sucesso em seu estoque!", livroRemovido));
        }
        catch (err) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
        }
    }
};
exports.EstoqueController = EstoqueController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LivroDto_1.Livro, Function, Function]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "adicionarLivroNoEstoque", null);
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "listarEstoque", null);
__decorate([
    (0, tsoa_1.Get)("{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "filtrarLivroNoEstoque", null);
__decorate([
    (0, tsoa_1.Put)("{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Function, Function]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "atualizarDisponibilidade", null);
__decorate([
    (0, tsoa_1.Delete)("{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "removerLivroNoEstoque", null);
exports.EstoqueController = EstoqueController = __decorate([
    (0, tsoa_1.Route)("estoque"),
    (0, tsoa_1.Tags)("Estoque")
], EstoqueController);
