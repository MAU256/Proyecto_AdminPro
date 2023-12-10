import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Paciente } from 'src/app/models/paciente.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { ModalPacienteService } from 'src/app/services/modal-paciente.service';
import { PacienteService } from 'src/app/services/paciente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styles: [
  ]
})
export class PacientesComponent implements OnInit {
  public pacientes: Paciente[] = [];
  public pacientesTemp: Paciente[] = [];
  public totalPacientes: number = 0;
  public desde: number = 0;
  public cargando: boolean = false;
  private imgSubs: Subscription = new Subscription();

  constructor(
    private pacienteService: PacienteService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService,
    private modalPacienteService: ModalPacienteService
  ) { }


  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarPacientes();
    this.modalImagenService.nuevaImagen
      .pipe(delay(300))
      .subscribe(img => {
        this.cargarPacientes()
      });

  }

  cargarPacientes() {
    this.cargando = true;
    this.pacienteService.cargarPacientes(this.desde)
      .subscribe(({ total, pacientes }) => {
        this.totalPacientes = total;
        this.pacientes = pacientes;
        this.pacientesTemp = pacientes;
        this.cargando = false;
      })
  }

  cambiarPagina(valor: number) {
    this.desde += valor

    if (this.desde < 0) {
      this.desde = 0
    } else if (this.desde >= this.totalPacientes) {
      this.desde -= valor;
    }
    this.cargarPacientes();
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.pacientes = this.pacientesTemp;
    }
    return this.busquedaService.buscar('pacientes', termino.trim())
      .subscribe((resultados: any) => {
        this.cargando = false;
        this.pacientes = resultados;
      }, error =>{
        this.cargando = true;
      });

  }

  abrirModal(paciente: Paciente) {
    this.modalImagenService.abrirModal('pacientes', paciente._id!, paciente.img);    

  }

  abrirModalInfo(paciente: Paciente) {
    this.modalPacienteService.abrirModal(paciente._id!);     

  }

  borrarPaciente(paciente: Paciente){    
    Swal.fire({      
      title: '¿Desea Borrar al usuario?',
      text: `Esta a punto de borrar al usuario ${paciente.nombre}!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {      
      if (result.isConfirmed) {        
        this.pacienteService.borrarPaciente(paciente._id!)
          .subscribe(resp => {
            Swal.fire({
              title: 'Eliminado!',
              text: `El paciente ${paciente.nombre} ha sido eliminado.`,
              icon: 'success',
              confirmButtonColor: '#00aa00',
            })
            this.cargarPacientes();
          });
      }
    })    
  }
 

}
