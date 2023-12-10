import { Medico } from "./medico.model";
import { Paciente } from "./paciente.model";

interface _User{    
    _id: string;
    nombre: string;
    email: string,
    img: string;
}


export class Cita{
    constructor(
        public titulo: string,
        public fechaEmision: Date,        
        public fechaCita: Date,
        public motivo: string,
        public tipoConsulta: string,
        public estado: string,
        public _id?: string,
        // public img?: string,
        // public usuario?: _User,        
        public medico?: Medico,
        public paciente?: Paciente,        

    ){}
}