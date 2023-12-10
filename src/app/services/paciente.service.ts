import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Paciente } from '../models/paciente.model';
import { map } from 'rxjs/operators';
import { CargarPaciente } from '../interfaces/cargar-pacientes.interface';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private http: HttpClient) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers:{
        'x-token': this.token
      }
    }
  }

  cargarPaciente(_id: string){
    const url = `${base_url}/pacientes/${_id}`;
    return this.http.get<any>(url, this.headers)
              .pipe(
                map((resp: {ok: boolean, paciente: Paciente}) => resp.paciente));
  }

  cargarPacientes(desde: number = 0){
    const url = `${base_url}/pacientes?desde=${desde}`;
    return this.http.get<CargarPaciente>(url, this.headers)
                .pipe(
                  map(resp =>{
                    const pacientes = resp.pacientes
                    return{
                      total: resp.total,
                      pacientes
                    }
                  })
                )
  }

  crearPaciente(paciente:Paciente) {
    const url = `${base_url}/pacientes`;    
    return this.http.post(url, paciente, this.headers)             
                
  }

  actualizarPaciente(paciente: Paciente) {    
    const url = `${base_url}/pacientes/${paciente._id}`;
    return this.http.put(url, paciente, this.headers)                
  }

  borrarPaciente(_id: string) {    
    const url = `${base_url}/pacientes/${_id}`;
    return this.http.delete(url, this.headers);                
  }
}
