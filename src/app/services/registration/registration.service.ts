import { Injectable } from '@angular/core';
import { Customer } from '../../models/customer/customer';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  BASE_URL = 'http://localhost:8080/api/usuarios/autocadastro';
  
  httpOptions = {
    observe: "response" as "response",
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  insert(user: Customer): Observable<Customer | null>  {
    return this.http.post<Customer>(this.BASE_URL,
      JSON.stringify(user),
      this.httpOptions).pipe(
        map((resp: HttpResponse<Customer> ) => {
        if (resp != null){
          console.log(resp.body);
          return resp.body;
        }else{
          return null;
        }
      }),
      catchError((err) => {
        return throwError(() => err);
      }))
    };
  };



