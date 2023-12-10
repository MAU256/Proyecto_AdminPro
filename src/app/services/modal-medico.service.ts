import { Injectable } from '@angular/core';
import { Medico } from '../models/medico.model';
import { MedicoService } from './medico.service';

@Injectable({
  providedIn: 'root'
})
export class ModalMedicoService {

  private _ocultarModal: boolean = true;  
  public id: string ='';    
  public medicoSeleccionado: Medico | any;
  

  constructor(
    private medicoService: MedicoService
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
    this.cargarMedico(id).subscribe(paciente => {
      this.medicoSeleccionado = paciente      
      
    });    
  }
  
  cargarMedico(id: string) {
    return this.medicoService.cargarMedico(id)      
  }
}
