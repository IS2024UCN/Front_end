import { Routes } from '@angular/router';
import path from 'path';
import { passwordChangeComponent } from './_auth/pages/passwordChangePage/password-change/password-change.component';

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
                path: 'worker-register',
                loadComponent: () => import('./_auth/pages/workerRegisterPage/worker-register/worker-register.component').then(m => m.WorkerRegisterComponent),
            },
            {
                path: 'see-workers',
                loadComponent: () => import('./_auth/pages/seeWorkersPage/see-workers/see-workers.component').then(m => m.SeeWorkersComponent),
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
        path: 'cliente',
        loadComponent: () => import('./_cliente/pages/general-page/general-page.component').then(m => m.GeneralPageComponent),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./_cliente/pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
            },
            {
                path: 'password-change',
                loadComponent: () => import('./_auth/pages/passwordChangePage/password-change/password-change.component').then(m => m.passwordChangeComponent),
            },
            {
                path: '**',
                redirectTo: 'dashboard',
            },
            {
                path:'',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
        ]
    },
    {
        path: 'trabajador',
        loadComponent: () => import('./_trabajador/pages/general-page/general-page.component').then(m => m.GeneralPageComponent),
        children: [
            {
            path: 'dashboard',
            loadComponent: () => import('./_trabajador/pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
            },
            {
                path: 'productRegister',  
                loadComponent: () => import('./_auth/pages/productRegisterPage/product-register/product-register.component').then(m => m.ProductRegisterComponent),
            },
            {
                path: 'seeProducts',  
                loadComponent: () => import('./_auth/pages/productsPage/products/products.component').then(m => m.ProductsComponent),
            },
            {
                path: 'seeClients',
                loadComponent: () => import('./_auth/pages/seeClientsPage/see-clients/see-clients.component').then(m => m.SeeClientsComponent),
            },
            {
                path: 'confirmRents',
                loadComponent: () => import('./_auth/pages/confirmRentsPage/confirm-rents/confirm-rents.component').then(m => m.ConfirmRentsComponent),
            },
            {
                path: '**',
                redirectTo: 'dashboard',
            },
            {
                path:'',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'loginTrabajador',
                loadComponent: () => import('./_auth/pages/loginFormTrabajadorPage/login-trabajador/login-trabajador.component').then(m => m.LoginTrabajadorComponent),
            }
        ]
    },
    {
        path: 'trabajadorr',
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
