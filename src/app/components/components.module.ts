import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DonaComponent } from './dona/dona.component';
import { NgChartsModule } from 'ng2-charts';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';
import { ModalPacienteComponent } from './modal-paciente/modal-paciente.component';
import { CrearCitaComponent } from './crear-cita/crear-cita.component';
import { ModalMedicoComponent } from './modal-medico/modal-medico.component';




@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent,
    ModalImagenComponent,
    ModalPacienteComponent,
    CrearCitaComponent,
    ModalMedicoComponent
    
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule,
    ReactiveFormsModule
    
  ],
  exports:[
    IncrementadorComponent,
    DonaComponent,
    ModalImagenComponent,
    ModalPacienteComponent,
    CrearCitaComponent,
    ModalMedicoComponent
  ]
})
export class ComponentsModule { }
