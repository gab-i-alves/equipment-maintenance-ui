import { AccountService } from './../../../../services/account/account.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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

  constructor(private router: Router, private AccountService: AccountService, private http: HttpClient) {}

  loginAction(){

    this.loginConditions = this.AccountService.login(this.email, this.password);

    if(!this.loginConditions[0] && !this.loginConditions[1]){
      this.router.navigate(['/home']);
    }

  }

  createAcount(){
    this.router.navigate(['/registration']);
  }
}
