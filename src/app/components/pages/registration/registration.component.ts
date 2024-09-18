import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  name: string = '';
  email: string = '';
  cpf: string = '';
  phone: string = '';
  cep: string = '';
  state: string = '';
  city: string = '';
  logradouro: string = '';
  number: string = '';
  complement: string = '';
  submiting: boolean = false;

  onSubmit() {
    if (this.isFormValid()){
      console.log('Formulário submetido com dados: ', {
        nome: this.name,
        email: this.email,
        cpf:this.cpf,
        telefone: this.phone,
        cep: this.cep,
        estado: this.state,
        cidade: this.city,
        logradouro: this.logradouro,
        número: this.number,
        complemento: this.complement
      });
    } else {
      console.log('Formulário com erros');
    }
  }

  isFormValid(): boolean {
    return (
      this.name.trim() !== '' &&
      this.email.trim() !== '' &&
      this.email.includes('@') &&
      this.cpf.trim().length === 14 &&
      this.phone.trim().length >= 11 &&
      this.cep.trim().length === 9 &&
      this.state.trim() !== '' &&
      this.city.trim() !== '' &&
      this.logradouro.trim() !== '' &&
      this.number.trim() !== ''
    );
  }
}
