import { Component } from '@angular/core';
import { SidebarComponent } from "../../sidebar/sidebar.component"
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';; 

@Component({
  selector: 'app-view-service',
  standalone: true,
  imports: [SidebarComponent, HttpClientModule],
  templateUrl: './view-service.component.html',
  styleUrl: './view-service.component.css'
})
export class ViewServiceComponent {
  constructor(private router: Router, private http: HttpClient) {}

  returnHome(){
      this.router.navigate(['/home']);
  }

}
