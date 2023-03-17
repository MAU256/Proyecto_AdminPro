import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];
  public totalHospitales: number = 0;
  public desde: number = 0;
  public cargando: boolean = false;
  private imgSubs: Subscription = new Subscription();

  constructor(
    private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
  ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();
    this.modalImagenService.nuevaImagen
      .pipe(delay(300))
      .subscribe(img => {
        this.cargarHospitales()
      });
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales(this.desde)
      .subscribe(({ total, hospitales }) => {
        this.totalHospitales = total;
        this.hospitales = hospitales;
        this.hospitalesTemp = hospitales;
        this.cargando = false;
      });
  }

  cambiarPagina(valor: number) {
    this.desde += valor

    if (this.desde < 0) {
      this.desde = 0
    } else if (this.desde >= this.totalHospitales) {
      this.desde -= valor;
    }
    this.cargarHospitales();
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital._id!, hospital.nombre)
      .subscribe(resp => {
        Swal.fire('Actualizado', hospital.nombre, 'success')
      });
  }

  eliminarHospital(hospital: Hospital) {
    this.hospitalService.borrarHospital(hospital._id!)
      .subscribe(resp => {
        this.cargarHospitales();
        Swal.fire('Borrado', hospital.nombre, 'success')
      });
  }

  async abrirSweetAlert() {
    const { value } = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    })

    if (value!.trim().length > 0) {
      this.hospitalService.crearHospital(value!)
        .subscribe((resp: any) => {
          this.hospitales.push(resp.hospital)
          this.cargarHospitales()
        })
    }
  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal('hospitales', hospital._id!, hospital.img);

  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.hospitales = this.hospitalesTemp;
    }
    return this.busquedasService.buscar('hospitales', termino.trim())
      .subscribe((resultados: any) => {
        this.cargando = false;
        this.hospitales = resultados;
      },error =>{
        this.cargando = true;
      });
  }


}
