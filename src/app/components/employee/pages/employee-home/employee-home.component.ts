
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
import { SolictacaoRequest } from '../../../../models/solicitacaoRequest';
import { RequestsService } from './../../../../services/requests/requests.service';
import { NgxMaskPipe } from 'ngx-mask';


@Component({
  selector: 'app-employee-home',
  standalone: true,
  imports: [EmployeeSidebarComponent, FormsModule, CommonModule, NgxMaskPipe],
  templateUrl: './employee-home.component.html',
  styleUrl: './employee-home.component.css'
})
export class EmployeeHomeComponent {
  finalDate: any;
  initialDate: any;
  requests: MaintenceRequest[] = [];
  requestSolicitacao: SolictacaoRequest[] = []
  openRequests: SolictacaoRequest[] = [];
  dataTable: any;
  
  constructor(private router : Router, private requestsService: RequestsService){ }

  ngOnInit() {
    console.log('ngOnInit chamado');
    this.requestsService.getSolicitacoesAberta().subscribe(
      (data: SolictacaoRequest[]) => {
        this.requestSolicitacao = data;
     
        console.log("Solicitações abertas:", this.requestSolicitacao);
        setTimeout(() => this.initializeDataTable(), 100);
      
      },
      (error) => {
        console.error('Erro ao buscar solicitação:', error);
      }
    );
  }
  ngAfterViewInit(): void {
  
  }
  
  initializeDataTable() {

  
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



    // ngOnInit() {
    //   this.requests = this.requestsService.getRequests();
    //   this.openRequests = this.requests.filter(request => request.status === 'ABERTA');
    // }

    doBudget(request: SolictacaoRequest) {
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

