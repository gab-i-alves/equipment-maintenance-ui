import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Login } from '../../models/login/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  BASE_URL = 'http://localhost:8080/api/usuarios/login';
  
  httpOptions = {
    observe: "response" as "response",
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) { }

  login(login: Login): Observable<Login | null>{
    return this.httpClient.post<Login>(this.BASE_URL, JSON.stringify(login), this.httpOptions)
      .pipe(
        map(
          (resp: HttpResponse<Login>) => {
            if(resp.status == 200) {
              return resp.body;
            }else{
              return null;
            }
          }
        ),
        catchError( (err) => {
          if(err.status == 401){
            return of(null);
          }else{
            return throwError( () => err);
          }
        })
      )
  }
}
