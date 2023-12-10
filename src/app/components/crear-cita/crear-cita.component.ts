import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cita } from 'src/app/models/cita.model';
import { CitaService } from 'src/app/services/cita.service';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import Swal from 'sweetalert2';
import { format, parseISO } from 'date-fns';
import { PacienteGetidService } from 'src/app/services/paciente-getid.service';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html',
  styles: [
  ]
})
export class CrearCitaComponent implements OnInit {

  public citaForm!: FormGroup;
  public citaSeleccionada: Cita | any;
  public medicoActual: Medico | any;
  public medicoSeleccionado: string = '';
  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];


  constructor(
    private fb: FormBuilder,
    private citaService: CitaService,
    private busquedaService: BusquedasService,
    private pacienteGetId: PacienteGetidService
  ) { }


  ngOnInit(): void {

    // this.medico!.nombre = " ";

    this.citaForm = this.fb.group({
      titulo: ['', Validators.required],
      fechaCita: ['', Validators.required],
      horaCita: ['', Validators.required],
      motivo: ['', Validators.required],
      tipoConsulta: ['', Validators.required],
      estado: ['', Validators.required],
    })
  }

  actualizarCita() {
    // const { titulo } = this.citaForm.value;
    const { titulo, fechaCita, horaCita, motivo, tipoConsulta, estado } = this.citaForm.value;
    if (this.citaSeleccionada) {
      //Actualizar cita
      const data = {
        ...this.citaForm.value,
        _id: this.citaSeleccionada._id
      }
      this.citaService.actualizarCita(data)
        .subscribe(resp => {
          Swal.fire({
            title: 'Actualizado',
            html: `<p>Cita ${titulo} actualizada correctamente</p>`,
            icon: 'success',
            customClass: {
              popup: 'my-popup-class',
              container: 'my-container-class'
            },
            didOpen: (modal) => {
              if (modal) {
                const backdrop = modal.querySelector('.swal2-backdrop');
                if (backdrop) {
                  backdrop.classList.add('my-backdrop-class');
                }
                modal.parentElement!.style.zIndex = '9999';
              }
            }
          });
        });
      return;

    }
    //Crear cita    
    const fechaHoraString = `${fechaCita}T${horaCita}:00.000Z`;
    const fechaHora = parseISO(fechaHoraString);

    // Obtener fecha actual
    const fechaActual = new Date();

    if (fechaHora > fechaActual) { // Verificar si la fecha es futura
      // Obtener el ID del médico, que ya tienes disponible
      const idMedico = this.medicoActual._id; // Asegúrate de tener la propiedad correcta para el ID del médico

      // Formatear manualmente la fecha y hora según el formato requerido
      const fechaCitaFormato = format(fechaHora, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
      const fechaActualFormato = format(fechaActual, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
      const idPaciente = this.pacienteGetId.getIdPaciente();

      // Crear objeto de datos para la nueva cita
      const data = {
        titulo,
        fechaEmision: fechaActualFormato,
        fechaCita: fechaCitaFormato,
        motivo,
        tipoConsulta,
        estado,
        medico: idMedico,
        paciente: idPaciente

      };
      this.citaSeleccionada = data;

      this.citaService.crearCita(this.citaSeleccionada)
        .subscribe(resp => {
          Swal.fire({
            title: 'Creado',
            html: `<p>Cita creada correctamente</p>`,
            icon: 'success',
            customClass: {
              popup: 'my-popup-class',
              container: 'my-container-class'
            },
            didOpen: (modal) => {
              if (modal) {
                const backdrop = modal.querySelector('.swal2-backdrop');
                if (backdrop) {
                  backdrop.classList.add('my-backdrop-class');
                }
                modal.parentElement!.style.zIndex = '9999';
              }
            }
          });
        });
      // Llama a la función para restablecer el formulario
      this.resetForm();
      this.medicoSeleccionado = "";
      this.medicoActual = null;
    } else {
      // La fecha y hora seleccionadas son anteriores a la fecha actual
      Swal.fire({
        title: 'Error',
        text: 'La fecha y hora de la cita deben ser futuras',
        icon: 'error',
        customClass: {
          popup: 'my-popup-class',
          container: 'my-container-class'
        },
        didOpen: (modal) => {
          if (modal) {
            const backdrop = modal.querySelector('.swal2-backdrop');
            if (backdrop) {
              backdrop.classList.add('my-backdrop-class');
            }
            modal.parentElement!.style.zIndex = '9999';
          }
        }
      });
    }
  }

  resetForm(): void {
    this.citaForm.reset();
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.medicos = this.medicosTemp;
    }
    return this.busquedaService.buscar('medicos', termino.trim())
      .subscribe((resultados: any) => {
        this.medicos = resultados;
      }, error => {
      });
  }

  seleccionarMedico(medico: Medico) {
    this.medicoActual = medico;
    this.medicoSeleccionado = this.medicoActual.nombre + " " + this.medicoActual.apellido;
    this.medicos = [];
    // Acciones al seleccionar un médico...
  }

}
