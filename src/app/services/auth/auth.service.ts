import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from '../../models/login/login';
import { Customer } from '../../models/customer/customer';
import { Employee } from '../../models/employee/employee';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: Customer | Employee | null;

  constructor() {
    this.currentUser = null;
  }

  public getCurrentCustomer(){
    const user: Customer = JSON.parse(localStorage.getItem('currentUser') || '{}')
    return user;
  }

  public getCurrentEmployee(){
    const user: Employee = JSON.parse(localStorage.getItem('currentUser') || '{}')
    return user;
  }

  login(user: Customer | Employee ) {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }
}