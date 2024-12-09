import { PaymentService } from './../../../../services/payment/payment.service';
import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';;
import { CommonModule } from '@angular/common';
import { SolicitacaoRequest } from '../../../../models/solicitacaoRequest';
import { BudgetRequest } from '../../../../models/budgetRequest';
import { BudgetService } from '../../../../services/budget/budget.service';
import { MaintenceRequest } from '../../../../models/mainteceRequest';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [SidebarComponent, HttpClientModule, CommonModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  budget: BudgetRequest | null = null;
  paymentService: PaymentService;
  request: MaintenceRequest | null = null;
  requestSolicitacao: SolicitacaoRequest | null = null;


  constructor(private router: Router, private http: HttpClient, private budgetService: BudgetService, paymentService: PaymentService, private route: ActivatedRoute) {this.paymentService = paymentService;}

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

  confirmPayment(): void {
    const idSolicitacao = +this.route.snapshot.params['id'];

    if (idSolicitacao) {
      this.paymentService.confirmPayment(idSolicitacao, 'PAGA').subscribe(
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
