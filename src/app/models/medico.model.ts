import { Hospital } from "./hospital.model";


interface _MedicoUser{    
    _id: string,
    nombre: string,    
    email: string,
    img: string,
}


export class Medico {
    constructor(
        public nombre: string,
        public apellido: string,
        public especialidad: string,
        public cedula: string,
        public telefono: string,
        public email: string,
        public _id?: string,
        public img?: string,
        public usuario?: _MedicoUser,
        public hospital?: Hospital

    ){}
}
