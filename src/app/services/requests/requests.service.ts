import { Injectable } from '@angular/core';
import { MaintenceRequest } from '../../models/mainteceRequest';
import { RequestStatus } from '../../models/enums/requestStatus';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { SolicitacaoRequest } from '../../models/solicitacaoRequest';
import { SolicitacaoHistorico } from '../../models/solicitacaoHistorico';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  
  BASE_URL = 'http://localhost:8080/api/solicitacoes';
  BASE_URL_SOLICITACAO = 'http://localhost:8080/api/solicitacoes/estado/aberta';
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getSolicitacoes(): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}`, this.httpOptions);
  }

  getSolicitacaoPorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/${id}`, this.httpOptions);
  }
  
  getSolicitacoesAberta(): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL_SOLICITACAO}`, this.httpOptions);
  }

  getSolicitacoesPorIdCliente(id: string): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/cliente/${id}`, this.httpOptions)
  }

  getSolicitacoesPorIdFuncionario(id: string): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/funcionario/${id}`, this.httpOptions)
  }

  getHistoricoBySolicitacao(id: number): Observable<SolicitacaoHistorico[]> {
    return this.http.get<SolicitacaoHistorico[]>(`${this.BASE_URL}/${id}/historico`);
  }

  insert(request: SolicitacaoRequest): Observable<SolicitacaoRequest|null> {
    return this.http.post<SolicitacaoRequest>(this.BASE_URL,
      JSON.stringify(request),
      this.httpOptions);
  };

  updateSolicitacao(request: SolicitacaoRequest): Observable<SolicitacaoRequest|null>{
    return this.http.put<SolicitacaoRequest>(this.BASE_URL,
      JSON.stringify(request),
      this.httpOptions);
  }
}
