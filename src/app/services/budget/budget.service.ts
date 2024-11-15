import { Injectable } from '@angular/core';
import { BudgetRequest } from '../../models/budgetRequest';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  BASE_URL = 'http://localhost:8080/api/orcamentos';
  BASE_URL_ORCAMENTO_BY_SOLICTACAO_ID = this.BASE_URL + '/solicitacao';
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

 getOrcamentoBySolicitacaoId(idSolic: number): Observable<any> {
  return this.http.get<any>(`${this.BASE_URL_ORCAMENTO_BY_SOLICTACAO_ID}/${idSolic}`, this.httpOptions);
}

  
}
