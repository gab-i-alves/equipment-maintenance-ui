import { Component } from '@angular/core';
import { EmployeeSidebarComponent } from "../../employee-sidebar/employee-sidebar.component";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import DataTable from 'datatables.net-dt';
import * as $ from 'jquery';
import 'datatables.net'; 
import 'datatables.net-dt'; 
import 'datatables.net-responsive';


@Component({
  selector: 'app-employee-home',
  standalone: true,
  imports: [EmployeeSidebarComponent, FormsModule],
  templateUrl: './employee-home.component.html',
  styleUrl: './employee-home.component.css'
})
export class EmployeeHomeComponent {
  finalDate: any;
  initialDate: any;
  
    ngAfterViewInit(): void {
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
    }
  
    constructor(private router : Router){ }
  
    doBudget(){
  
    }
    filterInitialDate() {
  
    }
  
    filterFinalDate() {
  
    }
  
    filterToday() {
    }
  
    removeFilters() {
    }
}

