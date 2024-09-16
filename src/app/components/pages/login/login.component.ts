import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarComponent } from "../../sidebar/sidebar.component"; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email:string = '';
  password:string = '';
  submiting:boolean = false;

  constructor(private router: Router) {}

  loginAction(){

    console.log(this.email + "--" + this.password);

    //teste 
    this.router.navigate(['/home']);
  }

  createAcount(){
    console.log("PARA O CADASTRO");
  }
}
