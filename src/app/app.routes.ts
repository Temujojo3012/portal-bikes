import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ErrorPage } from './error-page/error-page';
import { Login } from './login/login';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: '**',
        component: ErrorPage
    }
];
