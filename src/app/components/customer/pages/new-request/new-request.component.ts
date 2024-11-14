import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { FormsModule } from '@angular/forms';
import { MaintenceRequest } from '../../../../models/mainteceRequest';
import { RequestsService } from '../../../../services/requests/requests.service';
import { RequestStatus } from '../../../../models/enums/requestStatus';

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
    var novaRequisicao: MaintenceRequest =
    {
      status: RequestStatus.Open,
      date: this.data.toLocaleString('pt-BR', {dateStyle: 'short', timeStyle: 'short'}),
      id: 9,
      userName: 'Thiago Cezar',
      description: this.descEquipamento
    };

    console.log(this.RequestsService.insert(novaRequisicao))
  }

  returnHome(){
    this.router.navigate(['/home']);
  }
}
