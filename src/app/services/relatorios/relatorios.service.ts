import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BudgetRequest } from '../../models/budgetRequest';
import { Observable } from 'rxjs';
import { RelatorioRequest } from '../../models/relatorioRequest';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  BASE_URL = 'http://localhost:8080/api/solicitacoes/relatorios';
  BASE_URL_PAGAS = this.BASE_URL + '/pagas';     
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  getListServicosByDate(dateInic: Date, dateFin: Date): Observable<any> {
      const url = `${this.BASE_URL_PAGAS}?dateInic=${dateInic}&dateFin=${dateFin}`
      return this.http.get<RelatorioRequest[]>(url, this.httpOptions);
  }

   getListServicosByDateCategoria(dateInic: string, dateFin: string): Observable<any> {
      const url = `${this.BASE_URL_PAGAS}?dateInic=${dateInic}&dateFin=${dateFin}`
      return this.http.get<RelatorioRequest[]>(url, this.httpOptions);
  }
}
