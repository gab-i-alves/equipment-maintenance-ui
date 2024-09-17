import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faHistory, faSignOutAlt , faFileCirclePlus, faHouse, faBars, faBell} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  faUser = faUser;
  faHistory = faHistory;
  faSignOutAlt = faSignOutAlt;
  faFileCirclePlus = faFileCirclePlus;
  faHouse = faHouse;
  faBars = faBars;
  faBell = faBell;

  constructor(private router: Router){}

  outAction(){
    this.router.navigate(['/login']);
  }

  newRequestAction(){
    this.router.navigate(['/newRequest']);
  }

  homeAction(){
    this.router.navigate(['/home']);
  }

}
