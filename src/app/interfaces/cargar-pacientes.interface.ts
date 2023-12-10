import { Paciente } from "../models/paciente.model";


export interface CargarPaciente{
    total:number;
    pacientes:Paciente[];
}