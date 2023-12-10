import { Medico } from "./medico.model";

interface _User{    
    _id: string;
    nombre: string;
    email: string,
    img: string;
}


export class Paciente {
    constructor(
        public nombre: string,
        public apellido: string,
        public fechaNacimiento: Date,
        public genero: string,
        public direccion: string,
        public telefono: string,
        public email: string,
        public status: string,
        public password: string,        
        public _id?: string,
        public img?: string,
        public usuario?: _User,        

    ){}
}