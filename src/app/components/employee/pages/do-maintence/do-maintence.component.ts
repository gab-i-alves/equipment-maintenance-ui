import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeSidebarComponent } from '../../employee-sidebar/employee-sidebar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaintenceRequest } from '../../../models/mainteceRequest';
import { RequestStatus } from '../../../models/enums/requestStatus';

@Component({
  selector: 'app-do-maintence',
  standalone: true,
  imports: [EmployeeSidebarComponent, FormsModule, CommonModule],
  templateUrl: './do-maintence.component.html',
  styleUrl: './do-maintence.component.css'
})
export class DoMaintenceComponent implements OnInit {
request: MaintenceRequest | null = null;
redirectTarget: any;
employees: Array<string>;

  constructor(private router: Router) {
    this.employees = ["Maria", "Mário"]
  }

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


  returnHome() {
    this.router.navigate(['/view-requests']);
  }

  doMaintence() {
    if (this.request) {
      this.request.status = RequestStatus.WaitingPayment;
      this.router.navigate(['/view-requests']);
    }
  }

  redirectRequest(){
    if (this.request) {
      this.request.status = RequestStatus.Redirected;
      this.router.navigate(['/view-requests']);
    }
    //target = serviceEmployee.getEmployee(this.redirectTarget)
    //if (target != this.request.employee){
    //  this.request.redirect(target); exemplo
    //}
  }
}
