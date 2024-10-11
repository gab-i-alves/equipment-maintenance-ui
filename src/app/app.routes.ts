import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/customer/sidebar/sidebar.component';
import { authGuard } from './services/guard/auth.guard';
import { LoginComponent } from './components/customer/pages/login/login.component';
import { BudgetComponent } from './components/customer/budget/budget.component';
import { NewRequestComponent } from './components/customer/pages/new-request/new-request.component';
import { RegistrationComponent } from './components/customer/pages/registration/registration.component';
import { PaymentComponent } from './components/customer/payment/payment.component';
import { RescueServiceComponent } from './components/customer/rescue-service/rescue-service.component';
import { ViewServiceComponent } from './components/customer/view-service/view-service.component';
import { HomeComponent } from './components/customer/pages/home/home.component';
import { ViewRequestsComponent } from './components/employee/pages/view-requests/view-requests.component';
import { DoMaintenceComponent } from './components/employee/do-maintence/do-maintence.component';
import { MakeBudgetComponent } from './components/employee/pages/make-budget/make-budget.component';
import { InserirEditarCategoriaComponent } from './components/employee/pages/inserir-editar-categoria/inserir-editar-categoria.component';
import { ListarCategoriaComponent } from './components/employee/pages/list-categories/list-categories.component';
import { EmployeeHomeComponent } from './components/employee/pages/employee-home/employee-home.component';

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
    },
    {
        path: 'make-budget',
        component:MakeBudgetComponent,
        canActivate: [authGuard]
    },
    {
        path: 'employee-home',
        component:EmployeeHomeComponent,
        canActivate: [authGuard]
    },
    {
        path: 'view-requests',
        component:ViewRequestsComponent,
        canActivate: [authGuard]
    },
    {
        path: 'do-maintence',
        component:DoMaintenceComponent,
        canActivate: [authGuard]
    },
    {
        path: 'categories',
        component: ListarCategoriaComponent
    },
    {
        path: 'categories/new',
        component: InserirEditarCategoriaComponent
    },
    {
        path: 'categories/edit/:id',
        component: InserirEditarCategoriaComponent
    },
    {
        path: '',
        redirectTo: '/categories',
        pathMatch: 'full'
    }
];
