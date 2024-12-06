import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from '../../services/login/login.service';
import { Login } from '../../models/login/login';
import { AuthService } from '../../services/auth/auth.service';
import { Customer } from '../../models/customer/customer';
import { Employee } from '../../models/employee/employee';

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
  errorMessage: string = '';
  hasError: boolean = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private authService: AuthService
  ) {}

  loginAction() {
    if (this.email === '' || this.password === '') {
      this.handleError('Preencha corretamente ambos os campos');
      return;
    }

    this.loginService.login(new Login(this.email, this.password)).subscribe(
      (response: any) => this.handleLoginResponse(response),
      (error) => this.handleError('Erro no login: ' + error)
    );
  }

  handleLoginResponse(response: any) {
    if (response == null || !response.ativo) {
      this.handleError('E-mail ou senha incorretos');
      return;
    }

    const perfil = response.tipoPerfil.descricao;

    if (perfil === 'Cliente') {
      const cliente: Customer = response;
      this.authService.login(cliente);
      this.router.navigate(['/home']);
    } else {
      const funcionario: Employee = response;
      this.authService.login(funcionario);
      this.router.navigate(['/employee-home']);
    }
  }

  handleError(message: string) {
    this.hasError = true;
    this.errorMessage = message;
  }

  createAcount() {
    this.router.navigate(['/registration']);
  }
}
