import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  private BASE_URL = 'http://localhost:8080/api/solicitacoes';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  efetuarManutencao(
    solicitacaoId: number, 
    descricaoManutencao: string, 
    orientacoesCliente: string,
    funcionarioId: number
  ): Observable<any> {
    const url = `${this.BASE_URL}/${solicitacaoId}/manutencao`;
    const body = {
      descricaoManutencao,
      orientacoesCliente
    };

    return this.http.post(url, body, {
      ...this.httpOptions,
      headers: this.httpOptions.headers.set('idFuncionario', funcionarioId.toString())
    });
  }

  redirecionarManutencao(
    solicitacaoId: number,
    funcionarioOrigemId: number,
    funcionarioDestinoId: number
  ): Observable<any> {
    const url = `${this.BASE_URL}/${solicitacaoId}/redirecionamento`;
    const body = {
      idFuncionarioOrigem: funcionarioOrigemId,
      idFuncionarioDestino: funcionarioDestinoId
    };

    return this.http.post(url, body, this.httpOptions);
  }

  listarFuncionarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/funcionarios`, this.httpOptions);
  }
}