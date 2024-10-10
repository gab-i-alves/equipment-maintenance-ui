import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endereco } from '../../models/viacepResult';

@Injectable({
  providedIn: 'root'
})
export class ViacepService {

  constructor(private http: HttpClient) { }

  buscarCEP(cep: string): Observable<Endereco> {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    return this.http.get<Endereco>(url);
  }
}
