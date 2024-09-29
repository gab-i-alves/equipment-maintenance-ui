import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';; 

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [SidebarComponent, HttpClientModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  constructor(private router: Router, private http: HttpClient) {}




  returnHome(){
    this.router.navigate(['/home']);
  }


}
