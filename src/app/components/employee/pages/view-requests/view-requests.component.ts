import { endMaintenceService } from './../../../../services/endMaintence/end-maintence.service';
import { Component, OnInit } from '@angular/core';
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
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-view-requests',
  standalone: true,
  imports: [EmployeeSidebarComponent, FormsModule, CommonModule],
  templateUrl: './view-requests.component.html',
  styleUrl: './view-requests.component.css'
})
export class ViewRequestsComponent implements OnInit, AfterViewInit {

  requests: SolicitacaoRequest[] = [];
  dataTable: any;

  selectedRequest: SolicitacaoRequest | null = null;
  finalDate: any;
  initialDate: any;

  constructor(private router : Router, private requestService: RequestsService, private authService: AuthService, private endMaintenceService: endMaintenceService){this.endMaintenceService = endMaintenceService;}

  ngOnInit(){
    const employee = this.authService.getCurrentEmployee();

    this.requestService.getSolicitacoes().subscribe(
      (data: SolicitacaoRequest[]) => {
        this.requests = data;

        console.log("Solicitações:", this.requests);
        setTimeout(() => this.initializeDataTable(), 100);

      },
      (error) => {
        console.error('Erro ao buscar solicitação:', error);
      }
    );
  }

  ngAfterViewInit(): void {
    const modalElement = document.getElementById('endMaintence');
    if (modalElement) {
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.refreshPage();
      });
    }
  }

  refreshPage(): void {
    window.location.reload();
  }

  initializeDataTable() {
    if (!$.fn.dataTable.isDataTable('#tableSolic')) {
      this.dataTable = new DataTable('#tableSolic', {
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

  endMaintence(): void {
    if (this.selectedRequest) {
      const employee = this.authService.getCurrentEmployee();
      const idFuncionario = employee ? employee.id : null;

      if (idFuncionario) {
        this.endMaintenceService.endMaintence(this.selectedRequest.id, idFuncionario).subscribe(
          () => {
            console.log('Solicitação finalizada com sucesso.');
            this.requests = this.requests.filter(req => req.id !== this.selectedRequest!.id);
            this.selectedRequest = null;
          },
          (error) => {
            console.error('Erro ao finalizar a solicitação:', error);
          }
        );
      } else {
        console.error('ID do funcionário não encontrado.');
      }
    } else {
      console.error('Nenhuma solicitação selecionada.');
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
function refreshPage() {
  throw new Error('Function not implemented.');
}

