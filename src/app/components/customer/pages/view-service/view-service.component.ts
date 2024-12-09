import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitacaoRequest } from '../../../../models/solicitacaoRequest';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { SolicitacaoHistorico } from '../../../../models/solicitacaoHistorico';
import { RequestsService } from '../../../../services/requests/requests.service';
import { BudgetRequest } from '../../../../models/budgetRequest';
import { BudgetService } from '../../../../services/budget/budget.service';

type SolicitacaoState = 'ORÇADA' | 'REJEITADA' | 'ARRUMADA' | 'ABERTA' | 'PAGA' | 'FINALIZADA';

@Component({
  selector: 'app-view-service',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './view-service.component.html',
  styleUrls: ['./view-service.component.css']
})

export class ViewServiceComponent implements OnInit {
  request: SolicitacaoRequest | null = null;
  history: SolicitacaoHistorico[] = [];
  budget: BudgetRequest | null = null;

  constructor(
    private router: Router,
    private solicitacaoService: RequestsService,
    private budgetService: BudgetService
  ) {}

  ngOnInit(): void {
    const navigation = this.router.lastSuccessfulNavigation;
    if (navigation?.extras?.state) {
      this.request = navigation.extras.state['request'];
      this.loadHistory();
      this.loadBudget();
    }
  }

  loadBudget(): void {
    if (this.request?.id) {
      this.budgetService.getOrcamentoBySolicitacaoId(this.request.id).subscribe({
        next: (data) => {
          this.budget = data;
        },
        error: (error) => {
          console.error('Error loading budget:', error);
        }
      });
    }
  }

  loadHistory(): void {
    if (this.request) {
      this.solicitacaoService.getHistoricoBySolicitacao(this.request.id).subscribe({
        next: (data) => {
          this.history = data;
        },
        error: (error) => {
          console.error('Error loading history:', error);
        }
      });
    }
  }

  getStatusClass(): string {
    if (!this.request?.estadoSolicitacao?.descricao) return '';

    return `td-estado-${this.request.estadoSolicitacao.descricao.toLowerCase()}`;
  }

  private actionMap = new Map<SolicitacaoState, string>([
    ['ORÇADA', 'Aprovar/Rejeitar Serviço'],
    ['REJEITADA', 'Resgatar Serviço'],
    ['ARRUMADA', 'Pagar Serviço']
  ]);

  private classMap = new Map<SolicitacaoState, string>([
    ['ORÇADA', 'btn-primary'],
    ['REJEITADA', 'btn-warning'],
    ['ARRUMADA', 'btn-success']
  ]);

  private routeMap = new Map<SolicitacaoState, string[]>([
    ['ORÇADA', ['/budget']],
    ['REJEITADA', ['/rescue-service/:id']],
    ['ARRUMADA', ['/payment']]
  ]);

  timelineStates = [
    { state: 'ABERTA', icon: 'note_add', label: 'Solicitação Confirmada' },
    { state: 'ORÇADA', icon: 'request_quote', label: 'Orçada' },
    { state: 'APROVADA', icon: 'task', label: 'Aprovada' },
    { state: 'ARRUMADA', icon: 'handyman', label: 'Arrumada' },
    { state: 'PAGA', icon: 'paid', label: 'Paga' },
    { state: 'FINALIZADA', icon: 'check_circle', label: 'Finalizada' }
  ];

  getStateStatus(state: string): 'check' | 'cancel' | '' {
    const currentStatus = this.request?.estadoSolicitacao?.descricao || '';
    const statusOrder = ['ABERTA', 'ORÇADA', 'APROVADA', 'ARRUMADA', 'PAGA', 'FINALIZADA'];

    const currentIndex = statusOrder.indexOf(currentStatus);
    const stateIndex = statusOrder.indexOf(state);

    if (currentIndex >= stateIndex) return 'check';
    return '';
  }

  getStateDate(state: string): Date | null {
    if (!this.request) return null;

    switch (state) {
      case 'ABERTA':
        return new Date(this.request.dataHoraCriacao);
      case 'ORÇADA': {
        const date = this.request.budget?.dataHoraCriacao;
        return date ? new Date(date) : null;
      }
      case 'APROVADA': {
        const date = this.request.budget?.dataHoraAprovacao;
        return date ? new Date(date) : null;
      }
      case 'ARRUMADA': {
        const date = this.request.dataHoraManutencao;
        return date ? new Date(date) : null;
      }
      case 'PAGA': {
        const date = this.request.dataHoraPagamento;
        return date ? new Date(date) : null;
      }
      default:
        return null;
    }
  }

  getActionButton(): string {
    if (!this.request?.estadoSolicitacao?.descricao) return '';
    return this.actionMap.get(this.request.estadoSolicitacao.descricao as SolicitacaoState) || '';
  }

  getButtonClass(): string {
    if (!this.request?.estadoSolicitacao?.descricao) return '';
    return this.classMap.get(this.request.estadoSolicitacao.descricao as SolicitacaoState) || '';
  }

  executeAction(): void {
    if (!this.request) return;

    const state = this.request.estadoSolicitacao.descricao as SolicitacaoState;
    const route = this.routeMap.get(state);

    if (route) {
      if (state === 'REJEITADA' && this.request.id) {
        // Para a rota com o ID no caminho
        this.router.navigate([route[0].replace(':id', this.request.id.toString())]);
      } else if (state === 'ORÇADA') {
        // Para rotas que precisam de parâmetros adicionais
        this.router.navigate([...route, this.request.id.toString()]);
      } else {
        // Rotas normais
        this.router.navigate(route, { state: { request: this.request } });
      }
    }
  }

  returnHome(){
    this.router.navigate(['/home']);
  }

}
