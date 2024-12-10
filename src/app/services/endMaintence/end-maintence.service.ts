import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class endMaintenceService {
  BASE_URL = 'http://localhost:8080/api/solicitacoes/finalizar';

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

  constructor(private http: HttpClient) {}

  endMaintence(requestId: number, idFuncionario: number): Observable<void> {
    return this.http.put<void>(`${this.BASE_URL}/${requestId}?idFuncionario=${idFuncionario}`, {status});
  }
}
