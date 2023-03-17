import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CargarMedico } from '../interfaces/cargar-medicos.interface';
import { Medico } from '../models/medico.model';




const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class MedicoService {

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

  cargarMedico(_id: string){
    const url = `${base_url}/medicos/${_id}`;
    return this.http.get<any>(url, this.headers)
              .pipe(
                map((resp: {ok: boolean, medico: Medico}) => resp.medico));

  }

  cargarMedicos(desde: number = 0){
    const url = `${base_url}/medicos?desde=${desde}`;
    return this.http.get<CargarMedico>(url, this.headers)
                .pipe(
                  map(resp =>{
                    const medicos = resp.medicos
                    return{
                      total: resp.total,
                      medicos
                    }
                  })
                )
  }

  crearMedico(medico:Medico) {
    const url = `${base_url}/medicos`;
    return this.http.post(url, medico, this.headers)             
                
  }

  actualizarMedico(medico: Medico) {    
    const url = `${base_url}/medicos/${medico._id}`;
    return this.http.put(url, medico, this.headers)                
  }

  borrarMedico(_id: string) {    
    const url = `${base_url}/medicos/${_id}`;
    return this.http.delete(url, this.headers);                
  }

}
