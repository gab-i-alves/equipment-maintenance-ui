import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NewRequestComponent } from './components/pages/new-request/new-request.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
    {
        path: 'login',
        component: LoginComponent
    },

    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'sideBar',
        component:SidebarComponent
    },
    {
        path: 'newRequest',
        component:NewRequestComponent
    }
];
