import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/account.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email:string = '';
  password:string = '';
  submiting:boolean = false;

  loginFail:boolean = false;

  constructor(private router: Router, private loginService: LoginService) {}

  loginAction(){

    if(this.loginService.login(this.email, this.password)){

      this.router.navigate(['/home']);

    }else{

      this.loginFail = true;

    };
    
  }

  createAcount(){
    console.log("PARA O CADASTRO");
  }
}
