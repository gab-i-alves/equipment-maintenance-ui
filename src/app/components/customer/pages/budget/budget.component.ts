import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { FormsModule } from '@angular/forms';
import { MaintenceRequest } from '../../../../models/mainteceRequest';
import { RequestStatus } from '../../../../models/enums/requestStatus';
import { BudgetRequest } from '../../../../models/budgetRequest';
import { BudgetService } from '../../../../services/budget/budget.service';
import { SolicitacaoRequest } from '../../../../models/solicitacaoRequest';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [SidebarComponent, FormsModule, CommonModule],
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
  request: MaintenceRequest | null = null;
  rejectReason: string = '';
  budget: BudgetRequest | null = null
  requestSolicitacao: SolicitacaoRequest | null = null
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

  rejectService() {
    if (this.budget != null) {
      this.budgetService.rejeitarOrcamento(this.budget.idOrcamento, this.rejectReason).subscribe(
        () => {
          console.log("Orçamento rejeitado com sucesso!");
        },
        (error) => {
          console.error("Erro ao rejeitar o orçamento:", error);
        }
      );
    }
  }

  approveService(): void {
    if (this.budget != null) {
      this.budgetService.aprovarOrcamento(this.budget?.idOrcamento).subscribe(
        (responce) => {
          console.log("Orçamento Aprovado com Sucesso");
        
        },
        (error) => {
          console.error("Erro ao aprovar o orçamento:", error);
        }
      )
    }
  }

  returnHome(){
    this.router.navigate(['/home']);
  }
}
