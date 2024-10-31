import { MaintenceRequest } from './../../../../models/mainteceRequest';
import { RequestStatus } from './../../../../models/enums/requestStatus';
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
import { CommonModule } from '@angular/common';
import { RequestsService } from '../../../../services/requests/requests.service';

@Component({
  selector: 'app-view-requests',
  standalone: true,
  imports: [EmployeeSidebarComponent, FormsModule, CommonModule],
  templateUrl: './view-requests.component.html',
  styleUrl: './view-requests.component.css'
})
export class ViewRequestsComponent {

  requests: MaintenceRequest[] = [];
  selectedRequest: MaintenceRequest | null = null;
  finalDate: any;
  initialDate: any;

  constructor(private router : Router, private requestService: RequestsService){ }

  ngOnInit(){
    this.requests = this.requestService.getRequests();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (!$.fn.dataTable.isDataTable('#tableSolic')) {
        new DataTable('#tableSolic', {
          responsive: true,
          paging: true,
          pageLength: 8,
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

  doBudget(request: MaintenceRequest) {
    this.router.navigate(['/make-budget'], { state: { request: request} });
  }

  doMaintence(request: MaintenceRequest){
    this.router.navigate(['/do-maintence'], { state: { request: request} });
  }

  openFinalizationModal(request: MaintenceRequest) {
    this.selectedRequest = request;
  }

  endMaintence() {
    if (this.selectedRequest) {
      this.selectedRequest.status = RequestStatus.Finished;
      this.selectedRequest.finalizationDate = new Date().toISOString();
      this.selectedRequest.finalizedBy = 'Nome do Funcionário';
      this.selectedRequest = null;
    }
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
