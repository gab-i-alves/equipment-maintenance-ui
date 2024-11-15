import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { FormsModule } from '@angular/forms';
import { MaintenceRequest } from '../../../models/mainteceRequest';
import { RequestStatus } from '../../../models/enums/requestStatus';
import { BudgetRequest } from '../../../models/budgetRequest';
import { BudgetService } from '../../../services/budget/budget.service';

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
  budget: BudgetRequest | undefined;

  constructor(private router : Router, private route: ActivatedRoute, private budgetService: BudgetService) {}

  ngOnInit(): void {
    const navigation = this.router.lastSuccessfulNavigation;
    const idSolicitacao = +this.route.snapshot.params['id']
   
    this.budgetService.getOrcamentoBySolicitacaoId(idSolicitacao).subscribe(
      (data: BudgetRequest) => {
        this.budget = data;
      }
    )
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
