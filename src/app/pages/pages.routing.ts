import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettinsComponent } from './account-settins/account-settins.component';
import { PromesaComponent } from './promesa/promesa.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';


const routes: Routes = [
      // rutas hijas
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: {titulo: 'Dashboard'}},
      {path: 'profile', component: PerfilComponent, data: {titulo: 'Profile'}},
      { path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'}},
      { path: 'grafica1', component: Grafica1Component, data: {titulo: 'Grafica'}},
      {path: 'account-settings', component: AccountSettinsComponent, data: {titulo: 'Account-settings'}},
      {path: 'promesas', component: PromesaComponent, data: {titulo: 'Promesas'}},
      {path:'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs'}},

      //mantenimientos
      {path:'usuarios', component: UsuariosComponent, data: {titulo: 'Usuario de aplicacion'}},
    ]

  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
