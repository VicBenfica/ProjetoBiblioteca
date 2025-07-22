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
exports.UsuarioController = void 0;
const UsuarioService_1 = require("../service/UsuarioService");
const tsoa_1 = require("tsoa");
//importação dos decorators do tsoa
const UsuarioDto_1 = require("../model/dto/UsuarioDto");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
// importação dos Dto
let UsuarioController = class UsuarioController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.usuarioService = new UsuarioService_1.UsuarioService();
    }
    async criarUsuario(dto, fail, success) {
        try {
            const usuario = await this.usuarioService.cadastrarUsuario(dto);
            return success(201, new BasicResponseDto_1.BasicResponseDto("Usuario criado com sucesso", usuario));
        }
        catch (err) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
        }
    }
    //Criar usuario
    async listarUsuarios(fail, success) {
        try {
            const usuarios = await this.usuarioService.listarUsuarioComFiltro({});
            return success(202, new BasicResponseDto_1.BasicResponseDto("Usuários Cadastrados: ", usuarios));
        }
        catch (err) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
        }
    }
    //Lista todos os usuarios cadastrados
    async filtrarUsuario(cpf, fail, success) {
        try {
            const usuarioEncontrado = await this.usuarioService.buscarUsuario(cpf); // cpf é string
            return success(200, new BasicResponseDto_1.BasicResponseDto("Usuário encontrado com sucesso!", usuarioEncontrado));
        }
        catch (err) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
        }
    }
    //Retorna um usuario com o cpf
    async atualizarUsuario(cpf, dto, fail, success) {
        try {
            const usuarioAtualizado = await this.usuarioService.atualizarUsuario(cpf, dto);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Usuario atualizado com sucesso!", usuarioAtualizado));
        }
        catch (err) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
        }
    }
    //Alterar usuario
    async removerUsuario(cpf, fail, success) {
        try {
            const usuarioRemovido = await this.usuarioService.removerUsuario(cpf);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Usuário Removido com sucesso!", usuarioRemovido));
        }
        catch (err) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
        }
    }
};
exports.UsuarioController = UsuarioController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UsuarioDto_1.Usuario, Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "criarUsuario", null);
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "listarUsuarios", null);
__decorate([
    (0, tsoa_1.Get)("{cpf}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "filtrarUsuario", null);
__decorate([
    (0, tsoa_1.Put)("{cpf}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UsuarioDto_1.Usuario, Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "atualizarUsuario", null);
__decorate([
    (0, tsoa_1.Delete)("{cpf}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "removerUsuario", null);
exports.UsuarioController = UsuarioController = __decorate([
    (0, tsoa_1.Route)("usuario")
    //endpoints estaram na rota base /usuario
    ,
    (0, tsoa_1.Tags)("Usuário")
], UsuarioController);
