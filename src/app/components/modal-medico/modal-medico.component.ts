import { Component, OnInit } from '@angular/core';
import { Cita } from 'src/app/models/cita.model';
import { CitaService } from 'src/app/services/cita.service';
import { ModalMedicoService } from 'src/app/services/modal-medico.service'; 
import { Medico } from 'src/app/models/medico.model';


@Component({
  selector: 'app-modal-medico',
  templateUrl: './modal-medico.component.html',
  styles: [
  ]
})
export class ModalMedicoComponent implements OnInit {

  public citas: Cita[] = [];
  public citasTemp: Cita[] = [];
  public totalCitas: number = 0;
  public desde: number = 0;
  public cargando: boolean = true;
  public cargandoCitaForm: boolean = true;
  public medicoSeleccionado: Medico | any;
  public sinCitas: string = '';
  public fechaCita: string = ""

  constructor(    
    private citaService: CitaService, 
    public modalMedicoService: ModalMedicoService,
    
  ) { }

  ngOnInit(): void {
    console.log("Entro aqui")
  }

  cerrarModal() {    
    this.modalMedicoService.cerrarModal();
    this.cargando = true;  
  }
  

  verCitas(id: string) {
    this.cargando = true;
    this.citaService.cargarCitasMedico(id)
      .subscribe(({ total, citas }) => {
        this.citas = []
        this.citasTemp = []
        this.totalCitas = total;
        this.citas = citas;
        this.citasTemp = citas;
        this.cargando = false;
      })
  }

  ocultarCitas() {
    this.cargando = true;
  } 

  obtenerFechaFormateada(fecha: any) {
    let fechaCita: Date;
  
    if (fecha instanceof Date || typeof fecha === 'string') {
      fechaCita = new Date(fecha);
  
      // Verificamos si la conversión fue exitosa y si no es un valor NaN
      if (isNaN(fechaCita.getTime())) {
        fechaCita = new Date(); // Si la conversión falla, asignamos la fecha actual o algún valor predeterminado
      }
    } else {
      fechaCita = new Date(); // En caso de otro tipo de dato, asignamos la fecha actual o un valor predeterminado
    }
  
    return this.obtenerHoraFormateada(fechaCita);
  }
  
  obtenerHoraFormateada(fecha: Date) {
    const year = fecha.getUTCFullYear();
    const month = (`0${fecha.getUTCMonth() + 1}`).slice(-2);
    const day = (`0${fecha.getUTCDate()}`).slice(-2);
    const hour = (`0${fecha.getUTCHours()}`).slice(-2);
    const minute = (`0${fecha.getUTCMinutes()}`).slice(-2);
    const second = (`0${fecha.getUTCSeconds()}`).slice(-2);
  
    return `${day}/${month}/${year}, ${hour}:${minute}:${second}`;
  }

}
