import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form-interfaces';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { LoginForm } from '../interfaces/login-form-interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private base_url = environment.base_url;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) { }

  logOut(){
    localStorage.removeItem('token');
    const usuario = localStorage.getItem('email');
    google.accounts.id.revoke(usuario, () => {
      this.ngZone.run(() => {
        localStorage.removeItem('emailGoogle')
        this.router.navigateByUrl('/login');
      })
    });
  }


  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${this.base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((res: any) => {
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
  login(formData: LoginForm) {
    return this.http.post(`${this.base_url}/login`, formData)
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token)
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
