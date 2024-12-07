import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeSidebarComponent } from '../../employee-sidebar/employee-sidebar.component';
import { FormsModule } from '@angular/forms';
import { MaintenceRequest } from '../../../../models/mainteceRequest';
import { CommonModule } from '@angular/common';
import { RequestsService } from '../../../../services/requests/requests.service';
import { SolicitacaoRequest } from '../../../../models/solicitacaoRequest';
import { BudgetRequest } from '../../../../models/budgetRequest';
import { AuthService } from '../../../../services/auth/auth.service';
import { BudgetService } from '../../../../services/budget/budget.service';

@Component({
  selector: 'app-make-budget',
  standalone: true,
  imports: [EmployeeSidebarComponent, FormsModule, CommonModule],
  templateUrl: './make-budget.component.html',
  styleUrl: './make-budget.component.css'
})

export class MakeBudgetComponent implements OnInit {
  valorOrcamento: number = 0.00;
  descricaoOrcamento: string = '';
  request: SolicitacaoRequest | null = null;
  data:Date = new Date
  

  constructor(private router: Router, private budgetService: BudgetService, private RequestsService: RequestsService, private authService: AuthService) {}

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

  confirmBudget(descricao: string): void {
    this.descricaoOrcamento = descricao;
    const user = this.authService.getCurrentEmployee();

    if (this.request) {
      this.request.estadoSolicitacao = {id: 2, descricao: 'ORÇADA'}
      this.request.funcionarioManutencao = user;

      this.RequestsService.updateSolicitacao(this.request).subscribe();

      console.log("Solicitação orçada com o valor: " + this.valorOrcamento + " - Descrição: " + this.descricaoOrcamento);

      let budget:BudgetRequest = {
        idOrcamento: 0,
        valorOrcamento: this.valorOrcamento,
        aprovado: false,
        rejeitado: false,
        motivoRejeicao: '',
        dataHoraRejeicao: null,
        dataHoraCriacao: this.data,
        dataHoraAprovacao: null,
        funcionario: user,
        solicitacao: this.request,
        idFuncionario: user.id,
        nomeFuncionario: user.nome
      }

      this.budgetService.insert(budget).subscribe();
    }
  }


    returnHome(){
      this.router.navigate(['/view-requests'], { state: { updatedRequest: this.request}});
  }
}
