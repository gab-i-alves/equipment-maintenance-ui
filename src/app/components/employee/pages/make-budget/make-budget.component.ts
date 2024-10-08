import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeSidebarComponent } from '../../employee-sidebar/employee-sidebar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-make-budget',
  standalone: true,
  imports: [EmployeeSidebarComponent, FormsModule],
  templateUrl: './make-budget.component.html',
  styleUrl: './make-budget.component.css'
})
export class MakeBudgetComponent {
  valorOrcamento: number = 0.00;
  descricaoOrcamento: string = '';

  constructor(private router: Router) {}


  confirmBudget(descricao: string):void {
      this.descricaoOrcamento = descricao;
      console.log("Valor: " + this.valorOrcamento + " - Descricao: " + this.descricaoOrcamento)
  }


    returnHome(){
      this.router.navigate(['/view-requests']);
  }
}
