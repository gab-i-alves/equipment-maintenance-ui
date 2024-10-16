import { Injectable } from '@angular/core';
import { Employee } from '../../models/employee/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  listarTodos(): Employee[] {
    
  }

  inserir(employee: Employee): void {
 
  }

  buscarPorId(id: number): Employee | undefined {

  }

  atualizar(employee: Employee): void {
  
  }

  remover(id: number): void {

  }
}
