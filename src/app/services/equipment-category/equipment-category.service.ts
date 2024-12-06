import { Injectable } from '@angular/core';
import { CategoriaDeEquipamento } from '../../models/categoriaDeEquipamento/categoriaDeEquipamento.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipmentCategoryService {
  BASE_URL = 'http://localhost:8080/api/categorias-equipamento';

  httpOptions = {
    observe: "response" as "response",
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<CategoriaDeEquipamento[] | null> {
    return this.http.get<CategoriaDeEquipamento[]>(
      this.BASE_URL,
      this.httpOptions).pipe(
        map((resp: HttpResponse<CategoriaDeEquipamento[]>) => {
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

  buscarPorId(id: number): Observable<CategoriaDeEquipamento | null> {
    return this.http.get<CategoriaDeEquipamento>(
      this.BASE_URL + "/" + id,
      this.httpOptions).pipe(
        map((resp: HttpResponse<CategoriaDeEquipamento>) => {
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

  inserir(categoriaDeEquipamento: CategoriaDeEquipamento): Observable<CategoriaDeEquipamento | null> {
    return this.http.post<CategoriaDeEquipamento>(
      this.BASE_URL,
      JSON.stringify(categoriaDeEquipamento),
      this.httpOptions).pipe(
        map((resp: HttpResponse<CategoriaDeEquipamento>) => {
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

  

  atualizar(categoriaDeEquipamento: CategoriaDeEquipamento): Observable<CategoriaDeEquipamento | null> {
    return this.http.put<CategoriaDeEquipamento>(
      this.BASE_URL + "/" + categoriaDeEquipamento.id,
      JSON.stringify(categoriaDeEquipamento),
      this.httpOptions).pipe(
        map((resp: HttpResponse<CategoriaDeEquipamento>) => {
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

  remover(id: number): Observable<CategoriaDeEquipamento | null> { //VERIFICAR SE A REMOÇÃO POR ID FUNCIONA DESSA FORMA! 
    this.httpOptions.headers = this.httpOptions.headers.set('id', id.toString()); 
    return this.http.delete<CategoriaDeEquipamento>(
      this.BASE_URL + "/" + id,
      this.httpOptions,).pipe(
        map((resp: HttpResponse<CategoriaDeEquipamento>) => {
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
