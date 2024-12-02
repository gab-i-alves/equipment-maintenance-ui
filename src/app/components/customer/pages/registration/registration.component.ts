import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ViacepService } from '../../../../services/viacep/viacep.service';
import { Endereco } from '../../../../models/viacepResult';
import { Customer } from '../../../../models/customer/customer';
import { RegistrationService } from '../../../../services/registration/registration.service';

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
  bairro: string = '';
  estados: string[] = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  constructor(private viacepService: ViacepService, private router : Router, private registrationService: RegistrationService) {}

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
      const registro = new Customer(
        "",
        this.name,
        this.phone,
        this.email,
        this.cpf,
        true,
        { id: "1", descricao: "Cliente" },
        {
          estado: this.state,
          cidade: this.city,
          bairro: this.bairro,
          logradouro: this.logradouro,
          complemento: this.complement,
          cep: this.cep,
          numero: this.number
        }
      );

      this.registrationService.insert(registro).subscribe(
        (response: Customer | null) => {
          console.log('Registro inserido com sucesso:', response);
          this.submiting = false;
        },
        (error) => {
          console.error('Erro ao inserir registro:', error);
          this.submiting = false;
        }
      );

      alert("Registro realizado com sucesso. A senha de acesso foi enviada ao e-mail cadastrado!")
      this.router.navigate(["/login"]);

    } else {
      console.log('Formulário com erros');
      this.submiting = false;
    }
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

  isNameValid(): boolean {
    return this.name.trim().split(/\s+/).length >= 2;
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

  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let phone = input.value.replace(/\D/g, '');

    if (phone.length > 2) phone = `(${phone.slice(0, 2)}) ${phone.slice(2)}`;
    if (phone.length > 8) phone = `${phone.slice(0, 10)}-${phone.slice(10, 14)}`;

    input.value = phone;
    this.phone = phone;
  }


  isCepValid(): boolean {
    return /^\d{5}\-\d{3}$/.test(this.cep);
  }

  onCepInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let cep = input.value.replace(/\D/g, '');

    if (cep.length > 5) {
      cep = `${cep.slice(0, 5)}-${cep.slice(5)}`;
    }

    input.value = cep;
    this.cep = cep;
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
