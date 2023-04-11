import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { AuthGuard } from '../guards/auth.guard';


const routes: Routes = [
      // rutas hijas
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('./child-routes.module').then(modulo => modulo.ChildRoutesModule)

  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
