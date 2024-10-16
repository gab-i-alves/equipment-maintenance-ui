import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeSidebarComponent } from '../../employee-sidebar/employee-sidebar.component';
import { FormsModule } from '@angular/forms';
import { MaintenceRequest } from '../../../../models/mainteceRequest';
import { CommonModule } from '@angular/common';

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
  request: MaintenceRequest | null = null;

  constructor(private router: Router) {}

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
    console.log("Valor: " + this.valorOrcamento + " - Descricao: " + this.descricaoOrcamento);
  }


    returnHome(){
      this.router.navigate(['/view-requests']);
  }
}
