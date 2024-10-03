import { Component } from '@angular/core';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-make-budget',
  standalone: true,
  imports: [SidebarComponent],
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
      this.router.navigate(['/home']);
  }
}
