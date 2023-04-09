import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';
import { Usuario } from '../models/usuario.model';




@Injectable({
  providedIn: 'root'
})
export class BusquedasService {
  private base_url = environment.base_url;
  constructor(private http: HttpClient) {

  }

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

  private transformarUsuarios(resultados: Usuario[]): Usuario[] {
    return resultados.map(
      user => new Usuario(user)
    )

  }

  private transformarHospitales(resultados: Hospital[]): Hospital[] {
    return resultados;
  }

  private transformarMedicos(resultados: Medico[]): Medico[] {
    return resultados;
  }

  buscar(
    tipo: 'usuarios' | 'hospitales' | 'medicos',
    termino: string
  ) {
    const url = `${this.base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((resp: any) => {
          const resultados = {
            'usuarios': this.transformarUsuarios(resp.coleccion),
            'hospitales': this.transformarHospitales(resp.coleccion),
            'medicos': this.transformarMedicos(resp.coleccion)
          }
          return resultados[tipo];
        })
      );
  }

  busquedaGlobal(termino: string){
    const url = `${this.base_url}/todo/${termino}`;
    return this.http.get<any[]>(url, this.headers);
  }

}
