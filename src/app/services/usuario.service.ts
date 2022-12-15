import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form-interfaces';
import { environment } from 'src/environments/environment';
import { Observable, of, pipe } from 'rxjs';
import { LoginForm } from '../interfaces/login-form-interface';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { cargarUsuario } from '../interfaces/cargar-usuarios.interface';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private base_url = environment.base_url;
  public usuario!: Usuario;
  // private google: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) { }

  get token(): string {
    return localStorage.getItem('token') || "";
  }

  get uidUsuario(): string {
    return this.usuario.uid!;
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  logOut() {
    localStorage.removeItem('token');
    const usuario = localStorage.getItem('emailGoogle');
    google.accounts.id.revoke(usuario, () => {
      this.ngZone.run(() => {
        localStorage.removeItem('emailGoogle');
        this.router.navigateByUrl('/login');
      })
    });
  }
  
  validarToken(): Observable<boolean> {
    
    google.accounts.id.initialize({
      client_id: "403107613483-r5bkk65ms1oc9fdvno4aca917vb4e8gg.apps.googleusercontent.com",
    });
    pipe(delay(500))
    return this.http.get(`${this.base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(      
      tap((res: any) => {
        this.usuario = new Usuario(res.usuario);
        localStorage.setItem('token', res.token);
      }),
      map(res => true),
      catchError(error => of(false))
    );
  }


  crearUsuario(formData: RegisterForm): Observable<object> {
    return this.http.post(`${this.base_url}/usuarios`, formData)
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token)
        })
      )

  }

  actualizarPerfil(data: { nombre: string, email: string, role: string }): Observable<Object> {
    data = {
      ...data,
      role: this.usuario.role
    }
    return this.http.put(`${this.base_url}/usuarios/${this.uidUsuario}`, data, this.headers);
  }

  login(formData: LoginForm): Observable<any> {
    return this.http.post(`${this.base_url}/login`, formData)
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token);
        })
      )
  }

  loginGoogle(token: string): Observable<any> {
    return this.http.post(`${this.base_url}/login/google`, { token })
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token)
        })
      );

  }

  cargarUsuarios(desde: number = 0) {
    //localhost:3000/api/usuarios?desde=0
    const url = `${this.base_url}/usuarios?desde=${desde}`;
    return this.http.get<cargarUsuario>(url, this.headers)
      .pipe(
        map(resp => {
          const usuarios = resp.usuarios.map(user => new Usuario(user));
          return {
            total: resp.total,
            usuarios
          };
        })
      )

  }

  eliminarUsuario(usuario: Usuario){
    const url = `${this.base_url}/usuarios/${usuario.uid}`
    return this.http.delete(url, this.headers);

  }

  cambiarUsuario(usuario: Usuario): Observable<Object> {
    return this.http.put(`${this.base_url}/usuarios/${usuario.uid}`, usuario, this.headers);
  }


}
