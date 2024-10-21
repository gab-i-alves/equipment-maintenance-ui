import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';;
import { MaintenceRequest } from '../../../models/mainteceRequest';
import { CommonModule } from '@angular/common';
import { RequestStatus } from '../../../models/enums/requestStatus';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [SidebarComponent, HttpClientModule, CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  request: MaintenceRequest | null = null;

  constructor(private router: Router, private http: HttpClient) {}

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

  confirmPayment(): void {
    if (this.request) {
      this.request.status = RequestStatus.Payed;
    }
  }


  returnHome(){
    this.router.navigate(['/home']);
  }


}
