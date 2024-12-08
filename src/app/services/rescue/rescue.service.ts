import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RescueService {
  BASE_URL = 'http://localhost:8080/api/solicitacoes/resgatar';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  reapproveService(requestId: number, status: string): Observable<void> {
    return this.http.put<void>(`${this.BASE_URL}/${requestId}`, {status});
  }
}
