import { Component } from '@angular/core';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { FormsModule } from '@angular/forms';
import { timestamp, Timestamp } from 'rxjs';


@Component({
  selector: 'app-new-request',
  standalone: true,
  imports: [SidebarComponent, FormsModule],
  templateUrl: './new-request.component.html',
  styleUrl: './new-request.component.css'
})
export class NewRequestComponent {
  descEquipamento:string = '';
  categoria:number = 1;
  defeito:string = '';
  submiting:boolean = false;


  loginAction(){
    
  }

  createAcount(){
    console.log("PARA O CADASTRO");
  }
}
