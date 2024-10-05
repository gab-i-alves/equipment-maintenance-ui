import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeSidebarComponent } from '../employee-sidebar/employee-sidebar.component';

@Component({
  selector: 'app-do-maintence',
  standalone: true,
  imports: [EmployeeSidebarComponent],
  templateUrl: './do-maintence.component.html',
  styleUrl: './do-maintence.component.css'
})
export class DoMaintenceComponent {
  constructor(private router: Router) {}


  returnHome() {
    this.router.navigate(['/view-requests']);
  }
}
