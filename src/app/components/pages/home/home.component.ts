import { Component } from '@angular/core';
import DataTable from 'datatables.net-dt';
import * as $ from 'jquery';
import 'datatables.net'; 
import 'datatables.net-dt'; 
import 'datatables.net-responsive';
import { SidebarComponent } from "../../sidebar/sidebar.component"; 
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router, private http: HttpClient) {}
    
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

  rejectService() {
    console.log("Rejeitar serviço")
  }

  viewService() {
    this.router.navigate(['/viewservice']);
  }

  approveService() {
    console.log("Aprovar serviço")
  }

  rescueService() {
    console.log("Resgatar Serviço")
  }

  payService() {
    console.log("Pagar Serviço")
  }
}
