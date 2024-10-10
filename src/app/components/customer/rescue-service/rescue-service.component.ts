import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-rescue-service',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './rescue-service.component.html',
  styleUrl: './rescue-service.component.css'
})
export class RescueServiceComponent {

  constructor(private router : Router) { }

  reapproveService(){
    let reapproveDate = new Date();
    
    alert(`Serviço reaprovado. Horario da reaprovação: ${reapproveDate.toLocaleDateString()} - ${reapproveDate.getHours()}:${reapproveDate.getMinutes()}`);

    this.router.navigate(['/home']);

  }

  returnHome(){
    this.router.navigate(['/home']);
  }
}
