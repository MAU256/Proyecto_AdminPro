import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CargarHospital} from '../interfaces/cargar-hospitales.interface';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) { }


  get token(): string {
    return localStorage.getItem('token') || "";
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }
  get hospitales() {
    return;
  }

  cargarHospitales(desde: number = 0) {    
    const url = `${base_url}/hospitales?desde=${desde}`;
    return this.http.get<CargarHospital>(url, this.headers)
                .pipe(
                  map(resp => {
                    const hospitales = resp.hospitales
                    return {
                      total: resp.total,
                      hospitales
                    }
                  })
                );
  }

  crearHospital(nombre: string) {    
    const url = `${base_url}/hospitales`;
    return this.http.post(url, {nombre}, this.headers)             
                
  }

  actualizarHospital(_id:string, nombre: string) {    
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.put(url, {nombre}, this.headers)                
  }

  borrarHospital(_id: string) {    
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.delete(url, this.headers);                
  }


}
