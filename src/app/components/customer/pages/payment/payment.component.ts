import { PaymentService } from './../../../../services/payment/payment.service';
import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';;
import { CommonModule } from '@angular/common';
import { SolicitacaoRequest } from '../../../../models/solicitacaoRequest';
import { RequestsService } from '../../../../services/requests/requests.service';
import { BudgetRequest } from '../../../../models/budgetRequest';
import { BudgetService } from '../../../../services/budget/budget.service';
import { MaintenceRequest } from '../../../../models/mainteceRequest';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [SidebarComponent, HttpClientModule, CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  request: SolicitacaoRequest | null = null;
  budget: BudgetRequest | null = null;
  MaintenceRequest: MaintenceRequest | null = null;
  paymentService: PaymentService;


  constructor(private router: Router, private http: HttpClient, private solicitacaoService: RequestsService,
    private budgetService: BudgetService, paymentService: PaymentService, private route: ActivatedRoute) {this.paymentService = paymentService;}

  ngOnInit(): void {
    const navigation = this.router.lastSuccessfulNavigation;
    if (navigation?.extras?.state) {
      this.request = navigation.extras.state['request'];
    } else {
      console.error("Nenhuma solicitação recebida.");
    }

    const idSolicitacao = +this.route.snapshot.params['id']

    this.budgetService.getOrcamentoBySolicitacaoId(idSolicitacao).subscribe(
      (data: BudgetRequest) => {
        this.budget = data;
      }
    )
  }

  confirmPayment(): void {
    if (this.request) {
      this.paymentService.confirmPayment(this.request.id, 'PAGA').subscribe(
        (responce) => {
          console.log("Solicitação paga com sucesso");
        },
        (error) => {
          console.error("Erro ao confirmar o pagamento:", error);
        }
      );
    }
  }

  returnHome(){
    this.router.navigate(['/home']);
  }


}
