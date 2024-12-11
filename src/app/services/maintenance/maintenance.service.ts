import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  private readonly BASE_URL = 'http://localhost:8080/api';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  listarFuncionarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/funcionarios`, this.httpOptions);
  }

  efetuarManutencao(idSolicitacao: number, descricaoManutencao: string, orientacoesCliente: string, idFuncionario: number): Observable<any> {
    const body = {
      descricaoManutencao,
      orientacoesCliente
    };

    this.httpOptions.headers = this.httpOptions.headers.set('idFuncionario', idFuncionario.toString());
    
    return this.http.post(
      `${this.BASE_URL}/solicitacoes/${idSolicitacao}/manutencao`,
      body,
      this.httpOptions
    );
  }

  redirecionarManutencao(idSolicitacao: number, idFuncionarioOrigem: number, idFuncionarioDestino: number): Observable<any> {
    const body = {
      idFuncionarioOrigem,
      idFuncionarioDestino
    };

    return this.http.post(
      `${this.BASE_URL}/solicitacoes/${idSolicitacao}/redirecionamento`,
      body,
      this.httpOptions
    );
  }
}