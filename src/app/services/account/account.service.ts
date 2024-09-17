import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }

  login(email: string, password:string) : [boolean, boolean]{
    if(email == "emaildeteste@gmail.com" && password == "senhadeteste123"){
        debugger
        localStorage.setItem('user', 'true');
        return[false, false];    
    }
    if(email == '' || password == ''){
        return [true, false]; //vazio e sem erro
    }
    return [false, true]; //não vazio e com erro
    
  }

  logout(){
    localStorage.removeItem('user');
  }  
}
