import { RequestsService } from './../../../../services/requests/requests.service';
import { Component } from '@angular/core';
import { EmployeeSidebarComponent } from "../../employee-sidebar/employee-sidebar.component";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import DataTable from 'datatables.net-dt';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';
import 'datatables.net-responsive';
import { MaintenceRequest } from '../../../../models/mainteceRequest';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-employee-home',
  standalone: true,
  imports: [EmployeeSidebarComponent, FormsModule, CommonModule],
  templateUrl: './employee-home.component.html',
  styleUrl: './employee-home.component.css'
})
export class EmployeeHomeComponent {
  finalDate: any;
  initialDate: any;
  requests: MaintenceRequest[] = [];
  openRequests: MaintenceRequest[] = [];

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

    constructor(private router : Router, private requestsService: RequestsService){ }

    ngOnInit() {
      this.requests = this.requestsService.getRequests();
      this.openRequests = this.requests.filter(request => request.status === 'ABERTA');
    }

    doBudget(request: MaintenceRequest) {
      this.router.navigate(['/make-budget'], { state: { request: request} });
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

