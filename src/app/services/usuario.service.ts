import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form-interfaces';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { LoginForm } from '../interfaces/login-form-interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

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

  get uidUsuario(): string{
    return this.usuario.uid!;
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
    return this.http.get(`${this.base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      tap((res: any) => {
        console.log(res)
        this.usuario = new Usuario(res.usuario);
        console.log("USUARIOPRO", this.usuario)
        localStorage.setItem('token', res.token);
      }),
      map(res => true),
      catchError(error => of(false))
    );
  }


  crearUsuario(formData: RegisterForm): Observable<object> {
    console.log('Creando usuario');
    return this.http.post(`${this.base_url}/usuarios`, formData)
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token)
        })
      )

  }

  actualizarPerfil(data: { nombre: string, email: string, role: string }) {    
    data = {
      ...data,
      role: this.usuario.role
    }
    return this.http.put(`${this.base_url}/usuarios/${this.uidUsuario}`, data, {
      headers: {
        'x-token': this.token
      }
    });
  }

  login(formData: LoginForm) {
    return this.http.post(`${this.base_url}/login`, formData)
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token);
        })
      )
  }

  loginGoogle(token: string) {
    return this.http.post(`${this.base_url}/login/google`, { token })
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token)
        })
      );

  }


}
