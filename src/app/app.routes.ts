import { Routes } from '@angular/router';
import path from 'path';

export const routes: Routes = [

    {
        path: 'login',
        loadComponent: () => import('./_auth/pages/loginPage/login/login.component').then(m => m.LoginComponent),
    },
    {
        path: 'register',
        loadComponent: () => import('./_auth/pages/registerPage/register/register.component').then(m => m.RegisterComponent),
    },
    {
        path: 'administrador',
        loadComponent: () => import('./_admin/pages/general-page/general-page.component').then(m => m.GeneralPageComponent),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./_admin/pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
            },
            {
                path: '**',
                redirectTo: 'dashboard',
            },
            {
                path:'',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'admin',
        loadComponent: () => import('./_auth/pages/adminPage/admin/admin.component').then(m => m.AdminFComponent),
    },
    {
        path: 'cliente',
        loadComponent: () => import('./_auth/pages/clientePage/cliente/cliente.component').then(m => m.ClienteFComponent),
    },
    {
        path: 'trabajador',
        loadComponent: () => import('./_auth/pages/trabajadorPage/trabajador/trabajador.component').then(m => m.TrabajadorFComponent),
    },
    {
        path: 'loginTrabajador',
        loadComponent: () => import('./_auth/pages/loginFormTrabajadorPage/login-trabajador/login-trabajador.component').then(m => m.LoginTrabajadorComponent),
    },
    //redirección a la página de login en caso de que no se encuentre la ruta
    {
        path:'**',
        redirectTo: 'login',
    },
    //redirección a la página de login en caso de que la ruta este vacia
    {
        path:'',
        redirectTo: 'login',
        pathMatch: 'full'
    },

];
