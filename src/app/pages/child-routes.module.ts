import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettinsComponent } from './account-settins/account-settins.component';
import { PromesaComponent } from './promesa/promesa.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { PacientesComponent } from './mantenimientos/pacientes/pacientes.component';
import { PacienteComponent } from './mantenimientos/pacientes/paciente.component';
import { CitasComponent } from './mantenimientos/citas/citas.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';



const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: {titulo: 'Dashboard'}},
  {path: 'profile', component: PerfilComponent, data: {titulo: 'Profile'}},
  { path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'}},
  { path: 'grafica1', component: Grafica1Component, data: {titulo: 'Grafica'}},
  {path: 'account-settings', component: AccountSettinsComponent, data: {titulo: 'Account-settings'}},
  {path: 'promesas', component: PromesaComponent, data: {titulo: 'Promesas'}},
  {path:'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs'}},
  {path:'buscar/:termino', component: BusquedaComponent, data: {titulo: 'Busquedas'}},
  

  //mantenimientos
  {path:'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimiento de hospitales'}},
  {path:'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento de medicos'}},
  {path:'medico/:id', component: MedicoComponent, data: {titulo: 'Mantenimiento de medico'}},
  {path:'pacientes', component: PacientesComponent, data: {titulo: 'Mantenimiento de pacientes'}},
  {path:'paciente/:id', component: PacienteComponent, data: {titulo: 'Mantenimiento de paciente'}},
  {path:'citas', component: CitasComponent, data: {titulo: 'Mantenimiento de citas'}},
  //ruta admin
  {path:'usuarios', canActivate:[AdminGuard], component: UsuariosComponent, data: {titulo: 'Mantenimiento de usuarios'}},
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
