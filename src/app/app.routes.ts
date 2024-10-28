import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'login',
        loadComponent: () => import('./_auth/pages/loginPage/login/login.component').then(m => m.LoginComponent),
    },
    //redireccion a la pagina de login en caso de que no se encuentre la ruta
    {
        path:'**',
        redirectTo: 'login',
    },
    //redireccion a la pagina de login en caso de que la ruta este vacia
    {
        path:'',
        redirectTo: 'login',
        pathMatch: 'full'
    },

];
