import { AccountService } from './../../../../services/account/account.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginService } from '../../../../services/login/login.service';
import { Login } from '../../../../models/login/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email:string = '';
  password:string = '';
  submiting:boolean = false;

  loginConditions: [boolean, boolean] = [false, false]; //[Campos não preenchidos, Login incorreto]

  constructor(private router: Router, private accountService: AccountService, private loginService: LoginService, private http: HttpClient) {}

  loginAction(){
    if(!this.loginConditions[0] && !this.loginConditions[1]){
      console.log("Login")
      this.loginService.login(new Login(this.email, this.password)).subscribe(
        (response: Login | null) => {
          console.log('Login feito com sucesso:', response);
        },
        (error) => {
          console.error('Erro no login:', error);
        }
      );
      
    }

  }

  createAcount(){
    this.router.navigate(['/registration']);
  }
}
