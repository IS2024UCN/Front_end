import { Routes } from '@angular/router';
import { LoginformComponent } from './_auth/components/loginform/loginform.component';
import { RegisterFormComponent } from './_auth/components/register-form/register-form.component';
import { ClienteComponent } from './_auth/components/cliente/cliente.component';
import { GeneralPageComponent } from './_admin/pages/general-page/general-page.component';
import { TrabajadorComponent } from './_auth/components/trabajador/trabajador.component';
import { DashboardComponent } from './_admin/pages/dashboard/dashboard.component';
import { authGuardGuard } from './_auth/guards/auth-guard.guard';

export const routes: Routes = [
  { path: 'login', component: LoginformComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'admin', component: GeneralPageComponent, canActivate: [authGuardGuard],
    children: [
      {path:'dashboard', component: DashboardComponent},
      {path:'**', redirectTo: 'dashboard'},
      {path:'', redirectTo: 'dashboard', pathMatch: 'full'}
    ]
  },
  { path: 'trabajador', component: TrabajadorComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
