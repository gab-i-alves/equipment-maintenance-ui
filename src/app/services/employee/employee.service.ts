import { Injectable } from '@angular/core';
import { Employee } from '../../models/employee/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  Employees : Employee[] = [
    new Employee(1, "email1@gmail.com", "senha123", "Joao", new Date("12-03-1995").toLocaleString('pt-BR', {dateStyle: 'short'})),
    new Employee(2, "email2@gmail.com", "senha321", "Pedro", new Date("09-11-1987").toLocaleString('pt-BR', {dateStyle: 'short'}))
  ]

  listarTodos(): Employee[] {
    return this.Employees;
  }

  inserir(employee: Employee): void {
    this.Employees.push(employee);
    console.log("inserido" + employee);
  }

  buscarPorId(id: number): Employee | undefined {
    return this.Employees.find(e => e.id === id)
  }

  atualizar(employee: Employee): void {
    const employees = this.listarTodos();

    employees.forEach((obj, index, objs) => {
      if(employee.id === obj.id){
        objs[index] = employee;
      }
    })

  }

  remover(id: number): void {
    this.Employees = this.Employees.filter(e => e.id !== id);
  }
}
