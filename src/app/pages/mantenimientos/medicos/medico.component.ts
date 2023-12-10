import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {
  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado: Hospital | undefined;
  public medicoSeleccionado: Medico | any;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {


  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarMedico(id);
    })
    // this.medicoService.cargarMedico()
    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      especialidad: ['', Validators.required],
      cedula: ['', Validators.required],      
      telefono: ['', Validators.required],
      email: ['', Validators.required],
      hospital: ['', Validators.required]
    })

    this.medicoForm.get('hospital')?.valueChanges
      .subscribe(hospitalId => {
        this.hospitalSeleccionado = this.hospitales.find(h => h._id === hospitalId)

      })
    this.cargarHospitales()

  }


  cargarMedico(id: string) {
    if(id === 'nuevo'){
      return;
    }
    this.medicoService.cargarMedico(id)
      .pipe(
        delay(100)
      )
      .subscribe( medico => { 
        if(!medico){
          this.router.navigateByUrl(`/dashboard/medicos`);
          return;
        }
        const {nombre, apellido, especialidad, cedula, telefono, email, hospital} = medico;
        this.medicoSeleccionado = medico;
        this.medicoForm.setValue({nombre, apellido, especialidad, cedula, telefono, email, hospital: hospital?._id});
      })
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales()
      .subscribe((hospitales) => {
        this.hospitales = hospitales.hospitales;
      });
  }

  guardarMedico() {
    const { nombre } = this.medicoForm.value;
    if(this.medicoSeleccionado){
      //Actualizar medico
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this.medicoService.actualizarMedico(data)
          .subscribe(resp => {
            Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
          });
      return;

    }

    //Crear medico    
    this.medicoService.crearMedico(this.medicoForm.value)
      .subscribe((resp: any) => {
        Swal.fire('Creado', `${nombre} Creado Correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
      });
  }

}
