import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { FormsModule } from '@angular/forms';
import { MaintenceRequest } from '../../../../models/mainteceRequest';
import { RequestsService } from '../../../../services/requests/requests.service';

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
  request: MaintenceRequest | null = null;

  constructor(private router: Router, private RequestsService: RequestsService) {}

  newRequestAction(){
    this.RequestsService.addRequest(this.descEquipamento, this.categoria, this.defeito, this.data)
  }

  returnHome(){
    this.router.navigate(['/home']);
  }
}
