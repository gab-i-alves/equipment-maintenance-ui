import { Component} from '@angular/core';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { FormsModule } from '@angular/forms';

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
  data:Date = new Date
  submiting:boolean = false;

  newRequestAction(){
    console.log(this.descEquipamento)
    console.log(this.categoria)
    console.log(this.defeito)
    console.log(this.data)
  }
}
