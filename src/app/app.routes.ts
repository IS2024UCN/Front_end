import { Routes } from '@angular/router';
import { LoginformComponent } from './_auth/components/loginform/loginform.component';
import { RegisterFormComponent } from './_auth/components/register-form/register-form.component';

export const routes: Routes = [
  { path: 'login', component: LoginformComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
