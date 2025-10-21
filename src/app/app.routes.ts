import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ErrorPage } from './error-page/error-page';
import { Login } from './login/login';
import { authGuard } from './services/guard/auth-guard';
import { Bill } from './bill/bill';
import { NewOrder } from './new-order/new-order';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        canActivate: [authGuard]
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'new-order',
        component: NewOrder
    },
    {
        path: 'bill',
        component: Bill
    },
    {
        path: '**',
        component: ErrorPage
    }
];
