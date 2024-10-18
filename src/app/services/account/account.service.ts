import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }

  login(email: string, password:string) : [boolean, boolean]{
    if(email == "cliente@gmail.com" && password == "cliente123"){
        localStorage.setItem('customer', 'true');
        return[false, false];    
    }else{
      if(email == "funcionario@gmail.com" && password == "funcionario123"){
        localStorage.setItem('employee', 'true');
        return[false, false];    
      }
    }
    if(email == '' || password == ''){
        return [true, false]; //vazio e sem erro
    }
    return [false, true]; //não vazio e com erro
    
  }

  logout(){
    localStorage.removeItem('customer');
    localStorage.removeItem('employee');
  }  
}
