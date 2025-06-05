import { Usuario }  from "../model/Usuario";

export class UsuarioRepository {
    private static instance: UsuarioRepository;
    private emprestimos: Usuario[] = [];

    private constructor() {}

    public static getInstance(): UsuarioRepository {
        if (!this.instance) {
        this.instance = new UsuarioRepository();
    }
    return this.instance;
    }
}