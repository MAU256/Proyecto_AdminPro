import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Paciente } from 'src/app/models/paciente.model';
import { PacienteService } from 'src/app/services/paciente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styles: [
  ]
})
export class PacienteComponent implements OnInit {

  public pacienteForm!: FormGroup;  
  public pacienteSeleccionado: Paciente | any; 


  constructor(
    private fb: FormBuilder,    
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pacienteService: PacienteService
  ) {


  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarPaciente(id);
    })
    
    this.pacienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],      
      status: ['', Validators.required],      
    })

  }


  cargarPaciente(id: string) {
    if(id === 'nuevo'){
      return;
    }    
    this.pacienteService.cargarPaciente(id)
      .pipe(
        delay(100)
      )
      .subscribe( paciente => { 
        if(!paciente){
          this.router.navigateByUrl(`/dashboard/pacientes`);
          return;
        }
        const {nombre, apellido, fechaNacimiento, genero, direccion, telefono, email, status} = paciente;
        this.pacienteSeleccionado = paciente;       
        this.pacienteForm.patchValue({
          nombre,
          apellido,
          fechaNacimiento: new Date(fechaNacimiento).toISOString().substring(0, 10), // Formato YYYY-MM-DD
          genero,
          direccion,
          telefono,
          email,
          status
        });
        
      })
  }
  

  actualizarPaciente() {
    const { nombre } = this.pacienteForm.value;
    if(this.pacienteSeleccionado){
      //Actualizar paciente
      const data = {
        ...this.pacienteForm.value,
        _id: this.pacienteSeleccionado._id
      }
      this.pacienteService.actualizarPaciente(data)
          .subscribe(resp => {
            Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
          });
      return;

    }
    //Crear paciente    
    this.pacienteService.crearPaciente(this.pacienteForm.value)    
      .subscribe((resp: any) => {
        Swal.fire('Creado', `${nombre} Creado Correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/paciente/${resp.paciente._id}`);
      });
  }


}
