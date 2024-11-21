import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { FormsModule } from '@angular/forms';
import { MaintenceRequest } from '../../../../models/mainteceRequest';
import { RequestsService } from '../../../../services/requests/requests.service';
import { RequestStatus } from '../../../../models/enums/requestStatus';
import { CategoriaEquipamento, Cliente, Endereco, estadoSolicitacao, SolicitacaoRequest, tipoPerfil } from '../../../../models/solicitacaoRequest';

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
    var estado:estadoSolicitacao = {
      descricao: '',
      id: this.categoria,
    }
    var endereco:Endereco = {
      cep: 'String',
      bairro: 'String',
      cidade: 'String',
      complemento: 'String',
      estado: 'String',
      id: 0,
      lagradouro: 'String',
      numero: 0
    }

    var tipo:tipoPerfil = {
      id: 1,
      descricao: 'String'
    }

    var cliente:Cliente = {
      ativo: true,
      nome: 'jao',
      dataCriacao: this.data.toISOString(),
      email: '',
      endereco: endereco,
      senha: 'String',
      tipoPerfil: tipo
    }

    var categoriaEq:CategoriaEquipamento = {
      id: '1',
      descricao: 'String'
    }



    var novaRequisicao: SolicitacaoRequest =
    {
      estadoSolicitacao: estado,
      dataHoraCriacao: this.data,
      id: 0,
      descricao: '',
      cliente: cliente,
      descricaoDefeito: this.defeito,
      motivoRejeicao: '',
      descricaoEquipamento: this.descEquipamento,
      categoriaEquipamento: categoriaEq
    };

    this.RequestsService.insert(novaRequisicao).subscribe();

    console.log(this.RequestsService.insert(novaRequisicao))
  }

  returnHome(){
    this.router.navigate(['/home']);
  }
}
