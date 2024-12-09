import { RescueService } from './../../../../services/rescue/rescue.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { MaintenceRequest } from '../../../../models/mainteceRequest';
import { CommonModule } from '@angular/common';
import { RequestStatus } from '../../../../models/enums/requestStatus';
import { SolicitacaoRequest } from '../../../../models/solicitacaoRequest';
import { BudgetRequest } from '../../../../models/budgetRequest';
import { BudgetService } from '../../../../services/budget/budget.service';

@Component({
  selector: 'app-rescue-service',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: './rescue-service.component.html',
  styleUrls: ['./rescue-service.component.css']
})
export class RescueServiceComponent implements OnInit {
  request: MaintenceRequest | null = null;
  rescueService: RescueService;
  budget: BudgetRequest | null = null;
  requestSolicitacao: SolicitacaoRequest | null = null;

  constructor(private router : Router, rescueService: RescueService, private budgetService: BudgetService, private route: ActivatedRoute) {this.rescueService = rescueService}

  ngOnInit(): void {
    //const navigation = this.router.lastSuccessfulNavigation;
    //console.log("Navegação recebida:", navigation);
    //if (navigation?.extras.state) {
      //this.budget = navigation.extras.state['request'];
      //console.log("Dados da solicitação:", this.budget);
    //} else {
      //console.error("Nenhuma solicitação recebida.");
    //}
    const idSolicitacao = +this.route.snapshot.params['id'];

    this.budgetService.getOrcamentoBySolicitacaoId(idSolicitacao).subscribe(
      (data: BudgetRequest) => {
        this.budget = data;
      }
    )
  }

  reapproveService(): void{
    const idSolicitacao = +this.route.snapshot.params['id'];

    if (idSolicitacao) {
      this.rescueService.reapproveService(idSolicitacao, 'APROVADA').subscribe(
        (responce) => {
          console.log("Solicitação resgatada com sucesso");
        },
        (error) => {
          console.error("Erro ao resgatar a solicitação:", error);
        }
      );
    }
  }

  returnHome(){
    this.router.navigate(['/home']);
  }
}
