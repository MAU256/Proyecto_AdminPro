import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {
  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];
  public totalMedicos: number = 0;
  public desde: number = 0;
  public cargando: boolean = false;
  private imgSubs: Subscription = new Subscription();

  constructor(
    private medicoService: MedicoService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService
  ) { }


  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();
    this.modalImagenService.nuevaImagen
      .pipe(delay(300))
      .subscribe(img => {
        this.cargarMedicos()
      });

  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos(this.desde)
      .subscribe(({ total, medicos }) => {
        this.totalMedicos = total;
        this.medicos = medicos;
        this.medicosTemp = medicos;
        this.cargando = false;
      })
  }

  cambiarPagina(valor: number) {
    this.desde += valor

    if (this.desde < 0) {
      this.desde = 0
    } else if (this.desde >= this.totalMedicos) {
      this.desde -= valor;
    }
    this.cargarMedicos();
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.medicos = this.medicosTemp;
    }
    return this.busquedaService.buscar('medicos', termino.trim())
      .subscribe((resultados: any) => {
        this.cargando = false;
        this.medicos = resultados;
      }, error =>{
        this.cargando = true;
      });

  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id!, medico.img);

  }

  borrarMedico(medico: Medico){    
    Swal.fire({      
      title: '¿Desea Borrar al usuario?',
      text: `Esta a punto de borrar al usuario ${medico.nombre}!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {      
      if (result.isConfirmed) {        
        this.medicoService.borrarMedico(medico._id!)
          .subscribe(resp => {
            Swal.fire({
              title: 'Eliminado!',
              text: `El medico ${medico.nombre} ha sido eliminado.`,
              icon: 'success',
              confirmButtonColor: '#00aa00',
            })
            this.cargarMedicos();
          });
      }
    })    
  }

}
