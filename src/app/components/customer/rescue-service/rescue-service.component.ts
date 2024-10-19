import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { MaintenceRequest } from '../../../models/mainteceRequest';
import { CommonModule } from '@angular/common';
import { RequestStatus } from '../../../models/enums/requestStatus';

@Component({
  selector: 'app-rescue-service',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: './rescue-service.component.html',
  styleUrl: './rescue-service.component.css'
})
export class RescueServiceComponent implements OnInit {
  request: MaintenceRequest | null = null;

  constructor(private router : Router) {}

  ngOnInit(): void {
    const navigation = this.router.lastSuccessfulNavigation;
    console.log("Navegação recebida:", navigation);
    if (navigation?.extras.state) {
      this.request = navigation.extras.state['request'];
      console.log("Dados da solicitação:", this.request);
    } else {
      console.error("Nenhuma solicitação recebida.");
    }
  }

  reapproveService(){
    if (this.request) {
      let reapproveDate = new Date();
      this.request.status = RequestStatus.Approved;
    }
  }

  returnHome(){
    this.router.navigate(['/home']);
  }
}
