import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent {

  constructor(private router : Router) { }

  // Method to handle service rejection
  rejectService() {
    alert('Serviço rejeitado.');
    // You can add more logic here to handle the rejection
  }

  // Method to handle service approval
  approveService() {

  }

  returnHome(){
    this.router.navigate(['/home']);
  }
}
