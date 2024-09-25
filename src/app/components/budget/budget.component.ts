import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [SidebarComponent, FormsModule],
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent {
rejectReason: any;

  constructor(private router : Router) { }

  // Method to handle service rejection
  rejectService() {
    console.log('Serviço rejeitado.');

    //this.service.rejectReason = this.rejectReason
    //this.service.rejectBudget()
  }

  // Method to handle service approval
  approveService() {

  }

  returnHome(){
    this.router.navigate(['/home']);
  }
}
