import { Routes } from '@angular/router';
import { LoginformComponent } from './_auth/components/loginform/loginform.component';
import { RegisterFormComponent } from './_auth/components/register-form/register-form.component';
import { ClienteComponent } from './_auth/components/cliente/cliente.component';
import { AdminComponent } from './_auth/components/admin/admin.component';
import { TrabajadorComponent } from './_auth/components/trabajador/trabajador.component';

export const routes: Routes = [
  { path: 'login', component: LoginformComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'trabajador', component: TrabajadorComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
