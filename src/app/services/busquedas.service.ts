import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
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

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  private transformarUsuarios(resultados: Usuario[]): Usuario[]{
    return resultados.map(
      user =>  new Usuario(user)
    )

  }

  buscar(
      tipo: 'usuarios' | 'medicos' | 'hospitales',
      termino: string  
    ){      
    const url = `${this.base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers)
              .pipe(                
                map((resp: any) => {
                  switch(tipo){
                    case 'usuarios':
                      return this.transformarUsuarios(resp.coleccion);
                      break;
                    default:
                      return [];
                  }
                })
              );
  }

}
