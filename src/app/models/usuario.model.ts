import { environment } from "src/environments/environment"

const base_url = environment.base_url;

export class Usuario {
    public nombre: string
    public email: string
    public password: string
    public role: string
    public google: boolean
    public img: string
    public uid?: string
    constructor(usuario: Usuario) {
        this.nombre = usuario.nombre
        this.password = usuario.password
        this.role = usuario.role
        this.google = usuario.google
        this.img = usuario.img
        this.uid = usuario.uid
        this.email = usuario.email
    }

    get imagenUrl(): string{ 
       
        if(this.img){
            if(this.img.includes('https')){
                return this.img;
            }
            return `${base_url}/upload/usuarios/${this.img}`
        }
        return `${base_url}/upload/usuarios/no-image`;
    }
}