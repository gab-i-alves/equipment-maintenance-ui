import { Component, OnInit } from '@angular/core';
import { EmployeeSidebarComponent } from "../../employee-sidebar/employee-sidebar.component";
import { Employee } from '../../../../models/employee/employee';
import { EmployeeService } from '../../../../services/employee/employee.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-employees',
  standalone: true,
  imports: [EmployeeSidebarComponent, CommonModule, RouterModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit {

  Funcionarios : Employee[] = [];

  constructor(private employeeService : EmployeeService) {}

  ngOnInit(): void {
    this.Funcionarios = this.employeeService.listarTodos();
  }

  removerFuncionario(id: number) {
    this.employeeService.remover(id);
    this.Funcionarios = this.employeeService.listarTodos();
  
  }
}
