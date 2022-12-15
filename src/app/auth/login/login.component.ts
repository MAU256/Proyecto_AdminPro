import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';


declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('googleBtn')
  public googleBtn:ElementRef = {} as ElementRef;

  public loginForm: any = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: [null, Validators.required],
    remember: [false]
  });


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('email') !== null) {
      this.loginForm.get('remember').setValue(true)
    }
  }

  ngAfterViewInit(): void {
    this.googleInit();

  }

 async googleInit () {
    await google.accounts.id.initialize({
      client_id: "403107613483-r5bkk65ms1oc9fdvno4aca917vb4e8gg.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response)
    });    
    await google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response: any) {
    this.usuarioService.loginGoogle(response.credential)
                        .subscribe(resp => {                        
                          localStorage.setItem('emailGoogle', resp.email);                          
                          this.ngZone.run(() => {
                            this.router.navigateByUrl('/');
                          });                          
                        });   
  }



  login() {
    this.usuarioService.login(this.loginForm.value)
      .subscribe(res => {

        if ((this.loginForm.get('remember').value)) {
          localStorage.setItem('email', this.loginForm.get('email').value);
        } else {
          localStorage.removeItem('email');
        }
        this.router.navigateByUrl('/');
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

}
