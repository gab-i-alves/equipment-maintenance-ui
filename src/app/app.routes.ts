import { Component } from '@angular/core';
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
import { DoMaintenceComponent } from './components/employee/pages/do-maintence/do-maintence.component';
import { MakeBudgetComponent } from './components/employee/pages/make-budget/make-budget.component';
import { InserirEditarCategoriaComponent } from './components/employee/pages/inserir-editar-categoria/inserir-editar-categoria.component';
import { ListarCategoriaComponent } from './components/employee/pages/list-categories/list-categories.component';
import { EmployeeHomeComponent } from './components/employee/pages/employee-home/employee-home.component';
import { RelatoriosComponent } from './components/employee/pages/relatorios/relatorios.component';
import { EmployeesComponent } from './components/employee/pages/employees/employees.component';
import { NewEditEmployeeComponent } from './components/employee/pages/new-edit-employee/new-edit-employee.component';

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
        canActivate: [authGuard], data: {role: 'Cliente'}
    },
    {
        path: 'budget/:id',
        component: BudgetComponent,
        canActivate: [authGuard], data: {role: 'Cliente'}
    },
    {
        path: 'sideBar',
        component:SidebarComponent
    },
    {
        path: 'newRequest',
        component:NewRequestComponent,
        canActivate: [authGuard], data: {role: 'Cliente'}
    },
    {
        path: 'viewservice',
        component:ViewServiceComponent,
        canActivate: [authGuard], data: {role: 'Cliente'}
    },
    {
        path: 'payment',
        component:PaymentComponent,
        canActivate: [authGuard], data: {role: 'Cliente'}
    },
    {
        path: 'rescue-service',
        component:RescueServiceComponent,
        canActivate: [authGuard], data: {role: 'Cliente'}
    },
    {
        path: 'make-budget',
        component:MakeBudgetComponent,
        canActivate: [authGuard], data: {role : 'Funcionario'}
    },
    {
        path: 'employee-home',
        component:EmployeeHomeComponent,
        canActivate: [authGuard], data: {role : 'Funcionario'}
    },
    {
        path: 'view-requests',
        component:ViewRequestsComponent,
        canActivate: [authGuard], data: {role : 'Funcionario'}
    },
    {
        path: 'do-maintence',
        component:DoMaintenceComponent,
        canActivate: [authGuard], data: {role : 'Funcionario'}
    },
    {
        path: 'categories',
        component: ListarCategoriaComponent,
        canActivate: [authGuard], data: {role : 'Funcionario'}
    },
    {
        path: 'categories/new',
        component: InserirEditarCategoriaComponent,
        canActivate: [authGuard], data: {role : 'Funcionario'}
    },
    {
        path: 'categories/edit/:id',
        component: InserirEditarCategoriaComponent,
        canActivate: [authGuard], data: {role : 'Funcionario'}
    },
    {
        path: '',
        redirectTo: '/categories',
        pathMatch: 'full'
    },
    {
        path: 'relatorios',
        component: RelatoriosComponent,
        canActivate: [authGuard], data: {role : 'Funcionario'}
    },
    {
        path: 'employees',
        component: EmployeesComponent,
        canActivate: [authGuard], data: {role : 'Funcionario'}
    },
    {
        path: 'employees/new',
        component: NewEditEmployeeComponent,
        canActivate: [authGuard], data: {role : 'Funcionario'}
    },
    {
        path: 'employees/new/:id',
        component: NewEditEmployeeComponent,
        canActivate: [authGuard], data: {role : 'Funcionario'}
    },
];
