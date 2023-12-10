import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cita } from 'src/app/models/cita.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { CitaService } from 'src/app/services/cita.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styles: [
  ]
})
export class CitasComponent implements OnInit {

  public citas: Cita[] = [];
  public citasTemp: Cita[] = [];
  public totalCitas: number = 0;
  public desde: number = 0;
  public cargando: boolean = false;
  private imgSubs: Subscription = new Subscription();

  constructor(
    private citaService: CitaService,    
    private busquedaService: BusquedasService
  ) { }

  ngOnInit(): void {
    this.cargarCitas();    

  }

  cargarCitas() {
    this.cargando = true;
    this.citaService.cargarCitas(this.desde)
      .subscribe(({ total, citas }) => {
        this.totalCitas = total;
        this.citas = citas;
        this.citasTemp = citas;
        this.cargando = false;
      })
  }

  obtenerFechaFormateada(fecha: any) {
    let fechaCita: Date;
  
    if (fecha instanceof Date) {
      fechaCita = fecha; // Si ya es un objeto Date, se asigna directamente      
    } else if (typeof fecha === 'string') {
      // Si es una cadena, intentamos convertirla a Date
      fechaCita = new Date(fecha);
  
      // Verificamos si la conversión fue exitosa y si no es un valor NaN
      if (isNaN(fechaCita.getTime())) {
        fechaCita = new Date(); // Si la conversión falla, asignamos la fecha actual o algún valor predeterminado
      }
    } else {
      fechaCita = new Date(); // En caso de otro tipo de dato, asignamos la fecha actual o un valor predeterminado
    }
  
    return fechaCita.toLocaleDateString('es-ES');
  }
  

  obtenerHoraFormateada(fecha: any) {
    let horaFormateada: string = '';
  
    if (fecha instanceof Date) {
      horaFormateada = fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } else if (typeof fecha === 'string') {
      const fechaCita = new Date(fecha);
  
      if (!isNaN(fechaCita.getTime())) {
        horaFormateada = fechaCita.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      }
    }
  
    return horaFormateada;
  }
  
}
