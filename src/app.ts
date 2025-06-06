
import express from "express"
import { UsuarioController } from "./controller/UsuarioControllerController"

const usuarioController = new UsuarioController()

const app = express()

const PORT = process.env.PORT ?? 3000
app.use(express.json())

app.post("/api/usuario", usuarioController.criarUsuario.bind(usuarioController))

app.listen(PORT, () => console.log("Servidor rodando em http://localhost:3000"))
