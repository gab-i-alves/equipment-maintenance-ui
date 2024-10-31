import { Component } from '@angular/core';
import DataTable from 'datatables.net-dt';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';
import 'datatables.net-responsive';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MaintenceRequest } from '../../../../models/mainteceRequest';
import { RequestStatus } from '../../../../models/enums/requestStatus';
import { RequestsService } from '../../../../services/requests/requests.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, RouterModule, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  requests: MaintenceRequest[] = [];
  selectedRequest: MaintenceRequest | null = null;

  constructor(private router: Router, private requestService: RequestsService) {}

  ngOnInit(){
    this.requests = this.requestService.getRequests();
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
    }, 0);
  }

  viewBudget(request: MaintenceRequest) {
    this.router.navigate(['/budget'], { state: { request: request} });
  }

  viewService() {
    this.router.navigate(['/viewservice']);
  }

  rescueService(request: MaintenceRequest) {
    this.router.navigate(['/rescue-service'], { state: { request: request} });
  }

  payService(request: MaintenceRequest) {
    this.router.navigate(['/payment'], { state: { request: request} });
  }
}
