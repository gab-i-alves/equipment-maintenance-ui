import { Component } from '@angular/core';
import { SidebarComponent } from "../../sidebar/sidebar.component"; 

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent {

  // Method to handle service rejection
  rejectService() {
    alert('Serviço rejeitado.');
    // You can add more logic here to handle the rejection
  }

  // Method to handle service approval
  approveService() {
    alert('Serviço aprovado.');
    // You can add more logic here to handle the approval
  }
}
