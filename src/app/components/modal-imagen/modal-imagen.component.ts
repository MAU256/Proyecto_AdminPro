import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {  

  public imagenSubir!: File;
  public imgTem: ArrayBuffer | string = '';
  constructor(
    public modalImagenService: ModalImagenService,
    public fileUploadService: FileUploadService
    ) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTem = '';
    this.modalImagenService.cerrarModal();     
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
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService
      .actualizarFoto(this.imagenSubir, tipo, id)
      .then(img => {        
        Swal.fire('Guardado', 'La imagen se ha subido correctamente', 'success');
        this.modalImagenService.nuevaImagen.emit(img); 
        this.cerrarModal();
      }).catch(err => {
        Swal.fire('Error', 'Error al subir la imagen', 'error');
      });        
  }

}
