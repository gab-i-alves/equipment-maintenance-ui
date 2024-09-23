import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegistrationComponent } from './components/pages/registration/registration.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { authGuard } from './services/guard/auth.guard';
import { NewRequestComponent } from './components/pages/new-request/new-request.component';
import { BudgetComponent } from './components/budget/budget.component';
import { ViewServiceComponent } from './components/view-service/view-service.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RescueServiceComponent } from './components/rescue-service/rescue-service.component';

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
        path: 'registration',
        component: RegistrationComponent
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [authGuard]
    },
    {
        path: 'budget',
        component: BudgetComponent,
        canActivate: [authGuard]
    },
    {
        path: 'sideBar',
        component:SidebarComponent
    },
    {
        path: 'newRequest',
        component:NewRequestComponent,
        canActivate: [authGuard]
    },
    {
        path: 'viewservice',
        component:ViewServiceComponent,
        canActivate: [authGuard]
    },
    {
        path: 'payment',
        component:PaymentComponent,
        canActivate: [authGuard]
    },
    {
        path: 'rescue-service',
        component:RescueServiceComponent,
        canActivate: [authGuard]
    }
];
