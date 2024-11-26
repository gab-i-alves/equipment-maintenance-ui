import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from '../../models/login/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: { userId: string; tipoPerfil: string; } | null;

  constructor() {
    this.currentUser = { userId: '', tipoPerfil: '' };
  }

  public get currentUserValue(){
    return this.currentUser;
  }

  login(userId:string, tipoPerfil:string) {
    this.currentUser = {userId, tipoPerfil};
    localStorage.setItem('currentUser', JSON.stringify({userId, tipoPerfil}));
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }
}