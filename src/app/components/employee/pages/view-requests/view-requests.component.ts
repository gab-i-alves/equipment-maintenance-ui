import { Component } from '@angular/core';
import { SidebarComponent } from "../../../customer/sidebar/sidebar.component";
import { EmployeeSidebarComponent } from "../../employee-sidebar/employee-sidebar.component";
import { Router } from '@angular/router';
import DataTable from 'datatables.net-dt';
import * as $ from 'jquery';
import 'datatables.net'; 
import 'datatables.net-dt'; 
import 'datatables.net-responsive';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-requests',
  standalone: true,
  imports: [EmployeeSidebarComponent, FormsModule],
  templateUrl: './view-requests.component.html',
  styleUrl: './view-requests.component.css'
})
export class ViewRequestsComponent {
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
    this.router.navigate(['/make-budget']);
  }

  doMaintence(){
    this.router.navigate(['/do-maintence']);
  }

  endMaintence(){
    
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
