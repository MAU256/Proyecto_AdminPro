import { Injectable } from '@angular/core';
import { PacienteService } from './paciente.service';
import { Paciente } from '../models/paciente.model';


@Injectable({
  providedIn: 'root'
})
export class ModalPacienteService {

  private _ocultarModal: boolean = true;  
  public id: string ='';    
  public pacienteSeleccionado: Paciente | any;
  

  constructor(
    private pacienteService: PacienteService
  ) { }

  get ocultarModal(){
    return this._ocultarModal;
  }  

  cerrarModal(){
    this._ocultarModal = true;
  }

  

  abrirModal(id: string) {
    this._ocultarModal = false;
    this.id = id;
    this.cargarPaciente(id).subscribe(paciente => {
      this.pacienteSeleccionado = paciente      
      
    });
  }
  
  cargarPaciente(id: string) {
    return this.pacienteService.cargarPaciente(id)      
  }



}
