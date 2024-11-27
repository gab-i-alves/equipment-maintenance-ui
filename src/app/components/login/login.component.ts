import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from '../../services/login/login.service';
import { Login } from '../../models/login/login';
import { AuthService } from '../../services/auth/auth.service';
import { Customer } from '../../models/customer/customer';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  submiting: boolean = false;
  loginConditions: [boolean, boolean] = [false, false]; //[Campos não preenchidos, Login incorreto]

  constructor(
    private router: Router,
    private loginService: LoginService,
    private authService: AuthService
  ) {}

  loginAction() {
    this.loginConditions[0] = this.email === '' || this.password === '';
    if (this.loginConditions[0]) return;

    this.loginService.login(new Login(this.email, this.password)).subscribe(
      (response: any) => this.handleLoginResponse(response),
      (error) => console.error('Erro no login:', error)
    );
  }

  handleLoginResponse(response: any) {
    if (response == null) {
      this.loginConditions[1] = true;
      return;
    }

    const perfil = response.tipoPerfil.descricao;
    
    this.loginConditions[1] = false;
    
    if (perfil === 'Cliente') {
      const cliente : Customer = response;
      console.log(perfil);
      this.authService.login(cliente);
      this.router.navigate(['/home']);
    } else {
      //const funcionario : Employee = response;
      //this.authService.login(funcionario);
      this.router.navigate(['/employee-home']);
    }
  }

  createAcount() {
    this.router.navigate(['/registration']);
  }
}
