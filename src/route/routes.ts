
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
import { UsuarioController } from './../controller/UsuarioController';
import { LivroController } from './../controller/LivroController';
import { EstoqueController } from './../controller/EstoqueController';
import { EmprestimoController } from './../controller/EmprestimoController';
import { CategoriaUsuarioController } from './../controller/CategoriaUsuarioController';
import { CategoriaLivroController } from './../controller/CategoriaLivroController';
import { CategoriaCursoController } from './../controller/CategoriaCursoController';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';




const models: TsoaRoute.Models = {
    "Usuario": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "cpf": {"dataType":"string","required":true},
            "nome": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "categoriaId": {"dataType":"double","required":true},
            "cursoId": {"dataType":"double","required":true},
            "status": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["ativo"]},{"dataType":"enum","enums":["inativo"]},{"dataType":"enum","enums":["suspenso"]}],"required":true},
            "diaSuspensao": {"dataType":"double","required":true},
            "suspensaoAte": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BasicResponseDto": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
            "object": {"dataType":"any","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Livro": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "isbn": {"dataType":"string","required":true},
            "titulo": {"dataType":"string","required":true},
            "autor": {"dataType":"string","required":true},
            "editora": {"dataType":"string","required":true},
            "edicao": {"dataType":"string","required":true},
            "categoriaId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_Estoque_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"codigo":{"dataType":"double"},"livro_isbn":{"dataType":"string"},"status":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["disponivel"]},{"dataType":"enum","enums":["emprestado"]}]}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Emprestimo": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "cpfUsuario": {"dataType":"string","required":true},
            "codigoExemplar": {"dataType":"double","required":true},
            "dataEmprestimo": {"dataType":"datetime","required":true},
            "dataDevolucao": {"dataType":"datetime"},
            "dataEntrega": {"dataType":"datetime"},
            "diasAtraso": {"dataType":"double"},
            "suspencaoAte": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsUsuarioController_criarUsuario: Record<string, TsoaRoute.ParameterSchema> = {
                dto: {"in":"body","name":"dto","required":true,"ref":"Usuario"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"201","required":true,"ref":"BasicResponseDto"},
        };
        app.post('/usuario',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.criarUsuario)),

            async function UsuarioController_criarUsuario(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_criarUsuario, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'criarUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsuarioController_listarUsuarios: Record<string, TsoaRoute.ParameterSchema> = {
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"202","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/usuario',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.listarUsuarios)),

            async function UsuarioController_listarUsuarios(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_listarUsuarios, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'listarUsuarios',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsuarioController_filtrarUsuario: Record<string, TsoaRoute.ParameterSchema> = {
                cpf: {"in":"path","name":"cpf","required":true,"dataType":"string"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/usuario/:cpf',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.filtrarUsuario)),

            async function UsuarioController_filtrarUsuario(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_filtrarUsuario, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'filtrarUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsuarioController_atualizarUsuario: Record<string, TsoaRoute.ParameterSchema> = {
                cpf: {"in":"path","name":"cpf","required":true,"dataType":"string"},
                dto: {"in":"body","name":"dto","required":true,"ref":"Usuario"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.put('/usuario/:cpf',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.atualizarUsuario)),

            async function UsuarioController_atualizarUsuario(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_atualizarUsuario, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'atualizarUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsuarioController_removerUsuario: Record<string, TsoaRoute.ParameterSchema> = {
                cpf: {"in":"path","name":"cpf","required":true,"dataType":"string"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.delete('/usuario/:cpf',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.removerUsuario)),

            async function UsuarioController_removerUsuario(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_removerUsuario, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'removerUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLivroController_criarLivro: Record<string, TsoaRoute.ParameterSchema> = {
                dto: {"in":"body","name":"dto","required":true,"ref":"Livro"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"201","required":true,"ref":"BasicResponseDto"},
        };
        app.post('/livro',
            ...(fetchMiddlewares<RequestHandler>(LivroController)),
            ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.criarLivro)),

            async function LivroController_criarLivro(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_criarLivro, request, response });

                const controller = new LivroController();

              await templateService.apiHandler({
                methodName: 'criarLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLivroController_listarLivros: Record<string, TsoaRoute.ParameterSchema> = {
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"202","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/livro',
            ...(fetchMiddlewares<RequestHandler>(LivroController)),
            ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.listarLivros)),

            async function LivroController_listarLivros(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_listarLivros, request, response });

                const controller = new LivroController();

              await templateService.apiHandler({
                methodName: 'listarLivros',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLivroController_filtrarLivro: Record<string, TsoaRoute.ParameterSchema> = {
                isbn: {"in":"path","name":"isbn","required":true,"dataType":"string"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/livro/:isbn',
            ...(fetchMiddlewares<RequestHandler>(LivroController)),
            ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.filtrarLivro)),

            async function LivroController_filtrarLivro(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_filtrarLivro, request, response });

                const controller = new LivroController();

              await templateService.apiHandler({
                methodName: 'filtrarLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLivroController_atualizarLivro: Record<string, TsoaRoute.ParameterSchema> = {
                isbn: {"in":"path","name":"isbn","required":true,"dataType":"string"},
                dto: {"in":"body","name":"dto","required":true,"ref":"Livro"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.put('/livro/:isbn',
            ...(fetchMiddlewares<RequestHandler>(LivroController)),
            ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.atualizarLivro)),

            async function LivroController_atualizarLivro(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_atualizarLivro, request, response });

                const controller = new LivroController();

              await templateService.apiHandler({
                methodName: 'atualizarLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLivroController_removerLivro: Record<string, TsoaRoute.ParameterSchema> = {
                isbn: {"in":"path","name":"isbn","required":true,"dataType":"string"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.delete('/livro/:isbn',
            ...(fetchMiddlewares<RequestHandler>(LivroController)),
            ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.removerLivro)),

            async function LivroController_removerLivro(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_removerLivro, request, response });

                const controller = new LivroController();

              await templateService.apiHandler({
                methodName: 'removerLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEstoqueController_adicionarLivroNoEstoque: Record<string, TsoaRoute.ParameterSchema> = {
                dto: {"in":"body","name":"dto","required":true,"ref":"Livro"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.post('/estoque',
            ...(fetchMiddlewares<RequestHandler>(EstoqueController)),
            ...(fetchMiddlewares<RequestHandler>(EstoqueController.prototype.adicionarLivroNoEstoque)),

            async function EstoqueController_adicionarLivroNoEstoque(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_adicionarLivroNoEstoque, request, response });

                const controller = new EstoqueController();

              await templateService.apiHandler({
                methodName: 'adicionarLivroNoEstoque',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEstoqueController_listarEstoque: Record<string, TsoaRoute.ParameterSchema> = {
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"202","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/estoque',
            ...(fetchMiddlewares<RequestHandler>(EstoqueController)),
            ...(fetchMiddlewares<RequestHandler>(EstoqueController.prototype.listarEstoque)),

            async function EstoqueController_listarEstoque(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_listarEstoque, request, response });

                const controller = new EstoqueController();

              await templateService.apiHandler({
                methodName: 'listarEstoque',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEstoqueController_filtrarLivroNoEstoque: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/estoque/:id',
            ...(fetchMiddlewares<RequestHandler>(EstoqueController)),
            ...(fetchMiddlewares<RequestHandler>(EstoqueController.prototype.filtrarLivroNoEstoque)),

            async function EstoqueController_filtrarLivroNoEstoque(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_filtrarLivroNoEstoque, request, response });

                const controller = new EstoqueController();

              await templateService.apiHandler({
                methodName: 'filtrarLivroNoEstoque',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEstoqueController_atualizarDisponibilidade: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                dto: {"in":"body","name":"dto","required":true,"ref":"Partial_Estoque_"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.put('/estoque/:id',
            ...(fetchMiddlewares<RequestHandler>(EstoqueController)),
            ...(fetchMiddlewares<RequestHandler>(EstoqueController.prototype.atualizarDisponibildade)),

            async function EstoqueController_atualizarDisponibilidade(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_atualizarDisponibilidade, request, response });

                const controller = new EstoqueController();

              await templateService.apiHandler({
                methodName: 'atualizarDisponibilidade',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEstoqueController_removerLivroNoEstoque: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.delete('/estoque/:id',
            ...(fetchMiddlewares<RequestHandler>(EstoqueController)),
            ...(fetchMiddlewares<RequestHandler>(EstoqueController.prototype.removerLivroNoEstoque)),

            async function EstoqueController_removerLivroNoEstoque(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_removerLivroNoEstoque, request, response });

                const controller = new EstoqueController();

              await templateService.apiHandler({
                methodName: 'removerLivroNoEstoque',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEmprestimoController_criarEmprestimo: Record<string, TsoaRoute.ParameterSchema> = {
                dto: {"in":"body","name":"dto","required":true,"ref":"Emprestimo"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"201","required":true,"ref":"BasicResponseDto"},
        };
        app.post('/emprestimos',
            ...(fetchMiddlewares<RequestHandler>(EmprestimoController)),
            ...(fetchMiddlewares<RequestHandler>(EmprestimoController.prototype.criarEmprestimo)),

            async function EmprestimoController_criarEmprestimo(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEmprestimoController_criarEmprestimo, request, response });

                const controller = new EmprestimoController();

              await templateService.apiHandler({
                methodName: 'criarEmprestimo',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEmprestimoController_listarEmprestimos: Record<string, TsoaRoute.ParameterSchema> = {
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/emprestimos',
            ...(fetchMiddlewares<RequestHandler>(EmprestimoController)),
            ...(fetchMiddlewares<RequestHandler>(EmprestimoController.prototype.listarEmprestimos)),

            async function EmprestimoController_listarEmprestimos(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEmprestimoController_listarEmprestimos, request, response });

                const controller = new EmprestimoController();

              await templateService.apiHandler({
                methodName: 'listarEmprestimos',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEmprestimoController_registrarDevolucao: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.put('/emprestimos/:id/devolucao',
            ...(fetchMiddlewares<RequestHandler>(EmprestimoController)),
            ...(fetchMiddlewares<RequestHandler>(EmprestimoController.prototype.registrarDevolucao)),

            async function EmprestimoController_registrarDevolucao(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEmprestimoController_registrarDevolucao, request, response });

                const controller = new EmprestimoController();

              await templateService.apiHandler({
                methodName: 'registrarDevolucao',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCategoriaUsuarioController_listarCategoria: Record<string, TsoaRoute.ParameterSchema> = {
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"201","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/categoria-usuario',
            ...(fetchMiddlewares<RequestHandler>(CategoriaUsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(CategoriaUsuarioController.prototype.listarCategoria)),

            async function CategoriaUsuarioController_listarCategoria(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCategoriaUsuarioController_listarCategoria, request, response });

                const controller = new CategoriaUsuarioController();

              await templateService.apiHandler({
                methodName: 'listarCategoria',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCategoriaLivroController_listarCategoriaLivro: Record<string, TsoaRoute.ParameterSchema> = {
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/categoria-livros',
            ...(fetchMiddlewares<RequestHandler>(CategoriaLivroController)),
            ...(fetchMiddlewares<RequestHandler>(CategoriaLivroController.prototype.listarCategoriaLivro)),

            async function CategoriaLivroController_listarCategoriaLivro(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCategoriaLivroController_listarCategoriaLivro, request, response });

                const controller = new CategoriaLivroController();

              await templateService.apiHandler({
                methodName: 'listarCategoriaLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCursoController_listarCurso: Record<string, TsoaRoute.ParameterSchema> = {
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/categoria-cursos',
            ...(fetchMiddlewares<RequestHandler>(CategoriaCursoController)),
            ...(fetchMiddlewares<RequestHandler>(CategoriaCursoController.prototype.listarCurso)),

            async function CursoController_listarCurso(request: ExRequest, response: ExResponse, next: any) {


            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCursoController_listarCurso, request, response });

                const controller = new CategoriaCursoController();

              await templateService.apiHandler({
                methodName: 'listarCurso',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
