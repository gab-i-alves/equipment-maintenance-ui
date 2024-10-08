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

@Component({
  selector: 'app-view-requests',
  standalone: true,
  imports: [EmployeeSidebarComponent, FormsModule, CommonModule],
  templateUrl: './view-requests.component.html',
  styleUrl: './view-requests.component.css'
})
export class ViewRequestsComponent {

  requests: MaintenceRequest[] = [
    {
      status: RequestStatus.Approved,
      date: new Date().toLocaleDateString('pt-BR'),
      id: 0,
      userName: 'João Pereira',
      description: 'Notebook com defeito'
    },
    {
      status: RequestStatus.Open,
      date: new Date().toLocaleDateString('pt-BR'),
      id: 1,
      userName: 'Ana Banana',
      description: 'Notebook com defeito'
    },
    {
      status: RequestStatus.Rejected,
      date: new Date().toLocaleDateString('pt-BR'),
      id: 2,
      userName: 'Pedro Guiliver',
      description: 'Notebook com defeito'
    },
    {
      status: RequestStatus.Budgeted,
      date: new Date().toLocaleDateString('pt-BR'),
      id: 3,
      userName: 'Guilherme Alameda',
      description: 'Notebook com defeito'
    },
    {
      status: RequestStatus.Fixed,
      date: new Date().toLocaleDateString('pt-BR'),
      id: 4,
      userName: 'Julia Gamer',
      description: 'Notebook com defeito'
    },
    {
      status: RequestStatus.Payed,
      date: new Date().toLocaleDateString('pt-BR'),
      id: 5,
      userName: 'Heitor Souza',
      description: 'Notebook com defeito'
    },
  ];


  finalDate: any;
  initialDate: any;

  ngOnInit(){
    console.log(this.requests);
  }

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
