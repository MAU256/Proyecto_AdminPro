import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CargarCita } from '../interfaces/cargar-citas.interface';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Cita } from '../models/cita.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CitaService {

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


  cargarCitas(desde: number = 0){
    const url = `${base_url}/citas?desde=${desde}`;
    return this.http.get<CargarCita>(url, this.headers)
                .pipe(
                  map(resp =>{
                    const citas = resp.citas
                    return{
                      total: resp.total,
                      citas
                    }
                  })
                )
  }

  cargarCita(_id: string){
    const url = `${base_url}/citas/${_id}`;
    return this.http.get<any>(url, this.headers)
              .pipe(
                map((resp: {ok: boolean, cita: Cita}) => resp.cita));

  }

  cargarCitasPaciente(_id:string){
    const url = `${base_url}/citas/paciente/${_id}`;
    return this.http.get<CargarCita>(url, this.headers)
                .pipe(
                  map(resp =>{
                    const citas = resp.citas
                    return{
                      total: resp.total,
                      citas
                    }
                  })
                )
  }

  cargarCitasMedico(_id: string){
    const url = `${base_url}/citas/medico/${_id}`;
    return this.http.get<CargarCita>(url, this.headers)
                .pipe(
                  map(resp =>{
                    const citas = resp.citas
                    return{
                      total: resp.total,
                      citas
                    }
                  })
                )
  }

  crearCita(cita:Cita) {
    const url = `${base_url}/citas`;
    console.log(cita)
    return this.http.post(url, cita, this.headers)
                
  }

  actualizarCita(cita: Cita) {    
    const url = `${base_url}/citas/${cita._id}`;
    return this.http.put(url, cita, this.headers)                
  }
}
