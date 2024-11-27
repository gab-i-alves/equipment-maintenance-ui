import { AfterViewInit, Component, OnInit } from '@angular/core';
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
import { SolicitacaoRequest } from '../../../../models/solicitacaoRequest';
import { NgxMaskPipe } from 'ngx-mask';
import { AuthService } from '../../../../services/auth/auth.service';
import { Customer } from '../../../../models/customer/customer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, RouterModule, CommonModule, FormsModule, NgxMaskPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit {

  requestSolicitacao: SolicitacaoRequest[] = []
  requests: MaintenceRequest[] = [];
  selectedRequest: MaintenceRequest | null = null;
  dataTable: any;

  constructor(private router: Router, private requestService: RequestsService, private authService: AuthService) {}

  ngOnInit(){
    const customer: Customer = this.authService.getCurrentCustomer()
     this.requestService.getSolicitacoesPorId(customer.id).subscribe(
      (data: SolicitacaoRequest[]) => {
        
        this.requestSolicitacao = data;
        console.log(this.requestSolicitacao)
        setTimeout(() => {
          this.initializeDataTable();
        }, 100);
      
      },
      (error) => {
        console.error("Erro ao buscar solicitações:", error);
      }
    );
  }

  ngAfterViewInit(): void {
  
  }

  initializeDataTable() {
    this.dataTable = new DataTable('#tableSolic', {
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

  viewBudget(request: SolicitacaoRequest) {
    this.router.navigate(['/budget', request.id], { state: { request: request} });
  }

  viewService() {
    this.router.navigate(['/viewservice']);
  }

  rescueService(request: SolicitacaoRequest) {
    this.router.navigate(['/rescue-service'], { state: { request: request} });
  }

  payService(request: SolicitacaoRequest) {
    this.router.navigate(['/payment'], { state: { request: request} });
  }
}
