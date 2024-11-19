import { Injectable } from '@angular/core';
import { Registration } from '../../models/registration/registration';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  BASE_URL = 'http://localhost:8080/api/usuarios';
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  insert(user: Registration): Observable<Registration> {
    return this.http.post<Registration>(this.BASE_URL,
      JSON.stringify(user),
      this.httpOptions);
  };


}
