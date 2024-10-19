import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeSidebarComponent } from '../../employee-sidebar/employee-sidebar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-do-maintence',
  standalone: true,
  imports: [EmployeeSidebarComponent, FormsModule, CommonModule],
  templateUrl: './do-maintence.component.html',
  styleUrl: './do-maintence.component.css'
})
export class DoMaintenceComponent {
redirectTarget: any;
employees: Array<string>;


  constructor(private router: Router) {
    this.employees = ["Maria", "Mário"] 
  }


  returnHome() {
    this.router.navigate(['/view-requests']);
  }

  redirectRequest(){
    //target = serviceEmployee.getEmployee(this.redirectTarget)
    //if (target != this.request.employee){
    //  this.request.redirect(target); exemplo
    //}
  }
}
