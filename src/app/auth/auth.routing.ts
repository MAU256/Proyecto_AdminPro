import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingRoutingModule } from './auth-routing-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';



const routes: Routes = [
   // rutas padre
   { path: 'login', component: LoginComponent},
   { path: 'register', component: RegisterComponent},
    
]

@NgModule({ 
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class AuthRoutingModule { }
