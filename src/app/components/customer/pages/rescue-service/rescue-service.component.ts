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
  styleUrl: './rescue-service.component.css'
})
export class RescueServiceComponent implements OnInit {
  request: SolicitacaoRequest | null = null;
  rescueService: RescueService;
  budget: BudgetRequest | null = null;
  motivoRejeicao: String | null = null;
  valorOrcamento: Number | null = null;

  constructor(private router : Router, rescueService: RescueService, private budgetService: BudgetService, private route: ActivatedRoute) {this.rescueService = rescueService;}

  ngOnInit(): void {
    const navigation = this.router.lastSuccessfulNavigation;
    console.log("Navegação recebida:", navigation);
    if (navigation?.extras.state) {
      this.request = navigation.extras.state['request'];
      console.log("Dados da solicitação:", this.request);
    } else {
      console.error("Nenhuma solicitação recebida.");
    }
    const idSolic = Number(this.route.snapshot.paramMap.get('idSolic'));
    if (idSolic) {
      this.budgetService.getOrcamentoBySolicitacaoId(idSolic).subscribe(
        (data) => {
          this.budget = data;
          this.motivoRejeicao = data.rejeitado ? data.motivoRejeicao : null;
          this.valorOrcamento = data.valorOrcamento;
        },
        (error) => {
          console.error('Erro ao obter orçamento:', error);
        }
      );
    }
  }

  reapproveService(): void{
    if (this.request) {
      this.rescueService.reapproveService(this.request.id, 'APROVADA').subscribe(
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
