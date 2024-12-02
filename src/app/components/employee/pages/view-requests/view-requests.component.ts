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
import { SolicitacaoRequest } from '../../../../models/solicitacaoRequest';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-view-requests',
  standalone: true,
  imports: [EmployeeSidebarComponent, FormsModule, CommonModule],
  templateUrl: './view-requests.component.html',
  styleUrl: './view-requests.component.css'
})
export class ViewRequestsComponent {

  requests: SolicitacaoRequest[] = [];

  dataTable: any;
  selectedRequest: SolicitacaoRequest | null = null;
  finalDate: any;
  initialDate: any;

  constructor(private router : Router, private requestService: RequestsService, private authService: AuthService){ }

  ngOnInit(){

   console.log('ngOnInit Chaman')
   this.requestService.getSolicitacoes().subscribe(
    (data: SolicitacaoRequest[]) => {
      this.requests = data;
      console.log('Todas as Solicitações: ',this.requests)
      setTimeout(() => this.initializeTable(),100)
    },
    (error)=>{
      console.error("erro ao busca dados", error)
    }
   )
  }

  initializeTable() {
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
    }, 0); // Certifique-se de fechar todos os blocos.
  } 

   

  doBudget(request: SolicitacaoRequest) {
    this.router.navigate(['/make-budget'], { state: { request: request} });
  }

  doMaintence(request: SolicitacaoRequest){
    this.router.navigate(['/do-maintence'], { state: { request: request} });
  }

  openFinalizationModal(request: SolicitacaoRequest) {
    this.selectedRequest = request;
  }

  endMaintence() {
    if (this.selectedRequest) {

      this.selectedRequest.estadoSolicitacao.descricao = RequestStatus.Finished;
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
    
