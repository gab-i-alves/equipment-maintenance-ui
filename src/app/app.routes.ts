import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { InicialComponent } from './components/pages/inicial/inicial.component';

export const routes: Routes = [
    {
        path: '',
        component: InicialComponent,
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {   
        path: 'home',
        component: InicialComponent
    }
];
