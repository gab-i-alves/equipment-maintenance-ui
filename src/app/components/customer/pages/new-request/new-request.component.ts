import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { FormsModule } from '@angular/forms';
import { MaintenceRequest } from '../../../../models/mainteceRequest';
import { RequestsService } from '../../../../services/requests/requests.service';
import { RequestStatus } from '../../../../models/enums/requestStatus';
import { CategoriaEquipamento, estadoSolicitacao, SolicitacaoRequest } from '../../../../models/solicitacaoRequest';
import { AuthService } from '../../../../services/auth/auth.service';
import { Customer } from '../../../../models/customer/customer';

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

  constructor(private router: Router, private RequestsService: RequestsService, private authService: AuthService) {}

  newRequestAction(){
    const estado:estadoSolicitacao = {
      descricao: '',
      id: this.categoria,
    }

    const user = this.authService.getCurrentCustomer();

    console.log(user);

    const categoriaEq:CategoriaEquipamento = {
      id: '3',
      descricao: 'String'
    }

    const novaRequisicao: SolicitacaoRequest =
    {
      estadoSolicitacao: estado,
      dataHoraCriacao: this.data,
      id: 0,
      descricao: '',
      cliente: user,
      descricaoDefeito: this.defeito,
      motivoRejeicao: '',
      descricaoEquipamento: this.descEquipamento,
      categoriaEquipamento: categoriaEq,
      funcionarioManutencao: null
    };

    this.RequestsService.insert(novaRequisicao).subscribe();

    console.log(this.RequestsService.insert(novaRequisicao))
  }

  returnHome(){
    this.router.navigate(['/home']);
  }
}
