import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { FormsModule } from '@angular/forms';
import { MaintenceRequest } from '../../../models/mainteceRequest';
import { RequestStatus } from '../../../models/enums/requestStatus';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [SidebarComponent, FormsModule, CommonModule],
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
  request: MaintenceRequest | null = null;
  rejectReason: any;

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

  // Method to handle service rejection
  rejectService() {
    if (this.request) {
      this.request.status = RequestStatus.Rejected;
    }
    //this.service.rejectReason = this.rejectReason
    //this.service.rejectBudget()
  }

  approveService(): void {
    if (this.request) {
      this.request.status = RequestStatus.Approved;
    }
  }

  returnHome(){
    this.router.navigate(['/home']);
  }
}
