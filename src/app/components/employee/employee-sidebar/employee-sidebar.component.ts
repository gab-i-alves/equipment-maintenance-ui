import { Component, Input} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faHistory, faSignOutAlt , faFileCirclePlus, faHouse, faBars, faBell, faBook, faFilePdf} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-employee-sidebar',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './employee-sidebar.component.html',
  styleUrl: './employee-sidebar.component.css'
})
export class EmployeeSidebarComponent {
  @Input() title: string = 'Bem-Vindo, User X';
  faUser = faUser;
  faHistory = faHistory;
  faSignOutAlt = faSignOutAlt;
  faFileCirclePlus = faFileCirclePlus;
  faHouse = faHouse;
  faBars = faBars;
  faBell = faBell;
  faBook = faBook;
  faFilePdf = faFilePdf;

  constructor(private router: Router, private authService: AuthService){ }

  homeAction(){
    this.router.navigate(['/employee-home']);
  }

  viewRequests(){
    this.router.navigate(['/view-requests'])
  }

  relatorios() {
    this.router.navigate(['/relatorios'])
  }

  outAction(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  viewEmployees() {
    this.router.navigate(['/employees']);
  }

  viewCategories() {
    this.router.navigate(['/categories']);
  }
}

