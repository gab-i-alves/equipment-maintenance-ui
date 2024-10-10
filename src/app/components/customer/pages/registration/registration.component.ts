import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ViacepService } from '../../../../services/viacep/viacep.service';
import { Endereco } from '../../../../models/viacepResult';

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
  estados: string[] = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  constructor(private viacepService: ViacepService, private router : Router) {}

  buscarEndereco(): void {
    if(this.cep) {
      this.viacepService.buscarCEP(this.cep).subscribe(
        (dados: Endereco) => {
          if(!dados.erro) {
            this.logradouro = dados.logradouro;
            this.city = dados.localidade;
            this.state = dados.uf;
          } else {
            alert('CEP não encontrado!');
          }
        },
        (error) => {
          alert('Erro ao buscar o CEP!');
        }
      );
    }
  }

  onSubmit() {
    this.submiting = true;
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
        numero: this.number,
        complemento: this.complement
      });
    } else {
      console.log('Formulário com erros');
    }
    this.submiting = false;
  }

  onCpfInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let cpf = input.value.replace(/\D/g, '');

    if (cpf.length > 3) cpf = cpf.slice(0, 3) + '.' + cpf.slice(3);
    if (cpf.length > 7) cpf = cpf.slice(0, 7) + '.' + cpf.slice(7);
    if (cpf.length > 11) cpf = cpf.slice(0, 11) + '-' + cpf.slice(11);

    input.value = cpf;
    this.cpf = cpf;
  }

  isEmailValid(): boolean {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.email);
  }

  isCpfValid(): boolean {
    return /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(this.cpf);
  }

  isPhoneValid(): boolean {
    return /^\(\d{2}\)\s?\d{4,5}\-\d{4}$/.test(this.phone);
  }

  isCepValid(): boolean {
    return /^\d{5}\-\d{3}$/.test(this.cep);
  }

  isFormValid(): boolean {
    return (
      this.name.trim() !== '' &&
      this.isEmailValid() &&
      this.isCpfValid() &&
      this.isPhoneValid() &&
      this.isCepValid() &&
      this.state.trim() !== '' &&
      this.city.trim() !== '' &&
      this.logradouro.trim() !== '' &&
      this.number.trim() !== ''
    );
  }

  returnHome(){
    this.router.navigate(['/login']);
  }
}