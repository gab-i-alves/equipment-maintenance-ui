import { Injectable } from '@angular/core';
import { Employee } from '../../models/employee/employee';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  BASE_URL = 'http://localhost:8080/api/funcionarios';
  
  httpOptions = {
    observe: "response" as "response",
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient, private authService: AuthService){ }

  listarTodos(): Observable<Employee[] | null> {
    return this.http.get<Employee[]>(
      this.BASE_URL,
      this.httpOptions).pipe(
        map((resp: HttpResponse<Employee[]>) => {
          if(resp.status==200){
            return resp.body;
          }else{
            return [];
          }
        }),
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  buscarPorId(id: number): Observable<Employee | null> {
    return this.http.get<Employee>(
      this.BASE_URL + "/" + id,
      this.httpOptions).pipe(
        map((resp: HttpResponse<Employee>) => {
          if(resp.status==200){
            return resp.body;
          }else{
            return null;
          }
        }),
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  inserir(employee: Employee): Observable<Employee | null> {
    return this.http.post<Employee>(
      this.BASE_URL,
      JSON.stringify(employee),
      this.httpOptions).pipe(
        map((resp: HttpResponse<Employee>) => {
          if(resp.status==201){
            return resp.body;
          }else{
            return null;
          }
        }),
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  

  atualizar(employee: Employee): Observable<Employee | null> {
    return this.http.put<Employee>(
      this.BASE_URL + "/" + employee.id,
      JSON.stringify(employee),
      this.httpOptions).pipe(
        map((resp: HttpResponse<Employee>) => {
          if(resp.status==201){
            return resp.body;
          }else{
            return null;
          }
        }),
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  remover(id: number): Observable<Employee | null> {
    this.httpOptions.headers = this.httpOptions.headers.set('idFuncionario', this.authService.getCurrentEmployee().id.toString());
    return this.http.delete<Employee>(
      this.BASE_URL + "/" + id,
      this.httpOptions,).pipe(
        map((resp: HttpResponse<Employee>) => {
          if(resp.status==200){
            console.log(resp.body);
            return resp.body;
          }else{
            return null;
          }
        }),
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }
}
