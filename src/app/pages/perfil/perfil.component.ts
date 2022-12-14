import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {
  public perfilForm!: FormGroup;
  public usuario: Usuario;
  public imagenSubir!: File;
  public imgTem: ArrayBuffer | string = '';
  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService

  ) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.email, Validators.required]]
    });
  }

  actualizarPerfil() {
    console.log(this.perfilForm);
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe(res => {
        const { nombre, email } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        Swal.fire('Guardado', 'Los cambios fueron guardados', 'success')
      }, (err) =>{
        Swal.fire('Error',err.error.msg, 'error')
      });
  }

  cambiarImagen(file: File) {
    this.imagenSubir = file;
    if (!file) {
      this.imgTem = ''
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTem = reader.result || '';
    }

  }


  subirImagen() {
    this.fileUploadService
      .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid!)
      .then(img => {
        this.usuario.img = img
        Swal.fire('Guardado', 'La imagen se ha subido correctamente', 'success');
      }).catch(err => {
        Swal.fire('Error', 'Error al subir la imagen', 'error');
      });        
  }

}
