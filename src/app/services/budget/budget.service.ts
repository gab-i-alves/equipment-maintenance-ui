import { Injectable } from '@angular/core';
import { BudgetRequest } from '../../models/budgetRequest';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SolicitacaoRequest } from '../../models/solicitacaoRequest';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  
  BASE_URL = 'http://localhost:8080/api/orcamentos';
  BASE_URL_ORCAMENTO_BY_SOLICTACAO_ID = this.BASE_URL + '/solicitacao';
  BASE_URL_TESTE = 'http://localhost:8080/api/solicitacoes'       
  BASE_URL_APROVAR = 'http://localhost:8080/api/orcamentos/aprovar'
  BASE_URL_REJEITAR = 'http://localhost:8080/api/orcamentos/rejeitar'          
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  getOrcamentoBySolicitacaoId(idSolic: number): Observable<BudgetRequest> {
  return this.http.get<any>(`${this.BASE_URL_ORCAMENTO_BY_SOLICTACAO_ID}/${idSolic}`, this.httpOptions);
  }

  insert(budget: BudgetRequest): Observable<BudgetRequest|null> {
    return this.http.post<BudgetRequest>(this.BASE_URL,
      JSON.stringify(budget),
      this.httpOptions);
  };


  aprovarOrcamento(id : Number): Observable<any>{
    return this.http.put<any>(`${this.BASE_URL_APROVAR}/${id}`, {});
    
  }
  rejeitarOrcamento(id : Number , rejectReason: string): Observable<any>{
    return this.http.put<any>(`${this.BASE_URL_REJEITAR}/${id}`, rejectReason, {
      headers: { 'Content-Type': 'text/plain' },
    });
    
  }


}
