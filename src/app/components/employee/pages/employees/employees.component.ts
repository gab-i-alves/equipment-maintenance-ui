import { Component, OnInit } from '@angular/core';
import { EmployeeSidebarComponent } from "../../employee-sidebar/employee-sidebar.component";
import { Employee } from '../../../../models/employee/employee';
import { EmployeeService } from '../../../../services/employee/employee.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import DataTable from 'datatables.net-dt';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';
import 'datatables.net-responsive';

@Component({
  selector: 'app-view-employees',
  standalone: true,
  imports: [EmployeeSidebarComponent, CommonModule, RouterModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit {

  Funcionarios : Employee[] = [];

  selectedId! : number 

  constructor(private employeeService : EmployeeService) {}

  ngOnInit(): void {
    this.Funcionarios = this.employeeService.listarTodos();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (!$.fn.dataTable.isDataTable('#tableSolic')) {
        new DataTable('#tableSolic', {
          responsive: true,
          paging: true,
          searching: false,
          info: false,
          language: {
            processing: "Processando...",
            lengthMenu: "Mostrar _MENU_ registros",
            zeroRecords: "Nenhum registro encontrado",
            info: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
            infoEmpty: "Mostrando 0 até 0 de 0 registros",
            infoFiltered: "(filtrado de _MAX_ registros no total)",
            search: "Buscar:",
          }
        });
      }
    }, 0);
  }

  removerFuncionario() {
    this.employeeService.remover(this.selectedId);
    this.Funcionarios = this.employeeService.listarTodos();  
  }

  openRemoveModal(id: number) {
    this.selectedId = id;
  }
}
