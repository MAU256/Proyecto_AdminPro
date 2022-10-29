import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild('nombre')
  public campoNombre?: ElementRef = {} as ElementRef;
  @ViewChild('email')
  public campoEmail?: ElementRef = {} as ElementRef;
  @ViewChild('password')
  public campoPassword?: ElementRef = {} as ElementRef;
  @ViewChild('password2')
  public campoPassword2?: ElementRef = {} as ElementRef;

  public formSubmitted: boolean = false;
  public registerForm = this.fb.group({
    nombre: [null, [Validators.required, Validators.minLength(3)]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required],
    password2: [null, Validators.required],
    terminos: [false, Validators.required]
  }, {
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor(
    private fb: FormBuilder,
    private renderer2: Renderer2,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
  }

  crearUsuario() {
    this.formSubmitted = true;
    console.log(this.registerForm);
    if(this.registerForm.invalid){
      return;
    }
    console.log('posteando formulario');
    // Realizar el posteo
    this.usuarioService.crearUsuario(this.registerForm.value)
                        .subscribe(res =>{
                          this.router.navigateByUrl('/');
                        },(err)=> {
                          //si sucede un error
                          Swal.fire('Error', err.error.msg, 'error');
                        });


    
  }
  campoNoValido(campo: string): boolean {

    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      this.estiloCampoNoValido(campo);
      return true
    } else
      this.estiloCampoValido(campo);
    return false;
  }

  passwordIguales() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;
    if (pass1 === pass2) {
      this.estiloCampoValido("password2");
      return false
    }
    this.estiloCampoNoValido("password2");
    return true
  }

  passwordsIguales(pass1Name: string, pass2Name: string){
    return (formGroup: FormGroup) =>{
      const pass1Constrol = formGroup.get(pass1Name);
      const pass2Constrol = formGroup.get(pass2Name);
      if((pass1Constrol?.valid && pass2Constrol?.valid) && (pass1Constrol?.value === pass2Constrol?.value)){
        pass2Constrol?.setErrors(null)
      }else{
        pass2Constrol?.setErrors({noEsIgual: true})
      }
    }
  }



  aceptaTerminos(): boolean {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;

  }



  estiloCampoNoValido(campo: string) {
    try {
      let mapViewChild: any = {
        'nombre': this.campoNombre,
        'email': this.campoEmail,
        'password': this.campoPassword,
        'password2': this.campoPassword2,
      };
      const estiloNombre = mapViewChild[campo].nativeElement;
      this.renderer2.setStyle(estiloNombre, 'border', '1px solid red');

    } catch (error) {
      console.error(error);
    }
  }

  estiloCampoValido(campo: string) {
    try {
      if (this.registerForm.get(campo)?.valid) {
        let map: any = {
          'nombre': this.campoNombre,
          'email': this.campoEmail,
          'password': this.campoPassword,
          'password2': this.campoPassword2,
        }
        const estiloNombre = map[campo].nativeElement;
        this.renderer2.setStyle(estiloNombre, 'border', 'none');
      }
    } catch (error) {
      console.error(error);

    }


  }


}
