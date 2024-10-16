import { Component } from '@angular/core';
import { EmployeeSidebarComponent } from "../../employee-sidebar/employee-sidebar.component";

@Component({
  selector: 'app-view-employees',
  standalone: true,
  imports: [EmployeeSidebarComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class ViewEmployeesComponent {

}
