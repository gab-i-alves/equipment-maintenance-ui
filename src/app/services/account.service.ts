import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class LoginService{
    
    login(email: string, password:string) : boolean{
        if(email == "emaildeteste@gmail.com" && password == "senhadeteste123"){
            return true
        }

        return false;
    }
}