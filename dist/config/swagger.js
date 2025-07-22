"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const path_1 = __importDefault(require("path"));
// biblioteca nativa do Node.js para manipular caminhos de arquivos.
const fs_1 = __importDefault(require("fs"));
// módulo nativo para ler arquivos do sistema de arquivos.
const swaggerFile = path_1.default.join(__dirname, "../../dist/swagger.json");
// caminho absoluto
const swaggerSpec = JSON.parse(fs_1.default.readFileSync(swaggerFile, "utf-8"));
// Lê o conteúdo do swagger.json como texto (UTF-8) e converte para objeto JavaScript usando JSON.parse.
const setupSwagger = (app) => {
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
};
exports.setupSwagger = setupSwagger;
