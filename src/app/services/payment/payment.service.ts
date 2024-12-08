import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  BASE_URL = 'http://localhost:8080/api/solicitacoes/pagar';

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

  constructor(private http: HttpClient) {}

  confirmPayment(requestId: number, status: string): Observable<void> {
    return this.http.put<void>(`${this.BASE_URL}/${requestId}`, {status});
  }
}

