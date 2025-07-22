import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import path from "path";
// biblioteca nativa do Node.js para manipular caminhos de arquivos.

import fs from "fs";
// módulo nativo para ler arquivos do sistema de arquivos.

const swaggerFile = path.join(__dirname, "../../dist/swagger.json");
// caminho absoluto
const swaggerSpec = JSON.parse(fs.readFileSync(swaggerFile, "utf-8"));
// Lê o conteúdo do swagger.json como texto (UTF-8) e converte para objeto JavaScript usando JSON.parse.

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


};
