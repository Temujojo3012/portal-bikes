import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ErrorPage } from './error-page/error-page';
import { Bill } from './bill/bill';
import { NewOrder } from './new-order/new-order';

export const routes: Routes = [
    {
        path: '',
        component: Home
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
