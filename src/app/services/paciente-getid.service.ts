import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PacienteGetidService {

  private idPaciente: string = '';

  setIdPaciente(id: string) {
    this.idPaciente = id;
  }

  getIdPaciente() {
    return this.idPaciente;
  }
}
