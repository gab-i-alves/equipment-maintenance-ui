import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeSidebarComponent } from '../../employee-sidebar/employee-sidebar.component';

@Component({
  selector: 'app-make-budget',
  standalone: true,
  imports: [EmployeeSidebarComponent],
  templateUrl: './make-budget.component.html',
  styleUrl: './make-budget.component.css'
})
export class MakeBudgetComponent {
  valorOrcamento: number = 0;
  descricaoOrcamento: string = '';

  constructor(private router: Router) {}


  confirmBudget(valor: string, descricao: string):void {
      this.valorOrcamento = parseFloat(valor);
      this.descricaoOrcamento = descricao;
      console.log("Valor: " + this.valorOrcamento + " - Descricao: " + this.descricaoOrcamento)
  }


    returnHome(){
      this.router.navigate(['/view-requests']);
  }
}
