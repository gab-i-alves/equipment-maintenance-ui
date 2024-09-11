import { Component } from '@angular/core';
import User from '../../../../user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  enviar(senha: string, email:string){
    console.log("Botão" + email + senha);
    let user: User = new User(email, senha);
    this.users.push(user);
  }

  users: Array<User> = [];

}
