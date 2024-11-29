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

  Employees : Employee[] = [];

  selectedId! : number

  constructor(private employeeService : EmployeeService) {}

  ngOnInit(): void {
    this.listarTodos();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (!$.fn.dataTable.isDataTable('#tableSolic')) {
        new DataTable('#tableSolic', {
          responsive: true,
          paging: true,
          pageLength: 7,
          lengthChange: false,
          searching: false,
          info: false,
          language: {
            processing: "Processando...",
            zeroRecords: "Nenhum registro encontrado",
            info: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
            infoEmpty: "Mostrando 0 até 0 de 0 registros",
            infoFiltered: "(filtrado de _MAX_ registros no total)",
            search: "Buscar:",
          }
        });
      }
    }, 100);
  }

  removerFuncionario() {
    this.employeeService.remover(this.selectedId).subscribe({
      complete: () => { this.listarTodos(); },
      error: (err) =>{
        console.log(err.status + " // " + err.message);
      }
    });
  }

  openRemoveModal(id: number) {
    this.selectedId = id;
  }

  listarTodos() {
    this.employeeService.listarTodos().subscribe({
      next: (data: Employee[] | null) => {
        if(data != null){
          this.Employees = data.filter(e => e.ativo == true);
        }
      },
      error: (err) => {
        console.log(err.status + " // " + err.message);
      }
    })
  }

}
