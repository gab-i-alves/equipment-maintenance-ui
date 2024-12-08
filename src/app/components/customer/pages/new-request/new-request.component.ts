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
import { CategoriaDeEquipamento } from '../../../../models/categoriaDeEquipamento/categoriaDeEquipamento.model';
import { EquipmentCategoryService } from '../../../../services/equipment-category/equipment-category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-request',
  standalone: true,
  imports: [SidebarComponent, FormsModule, CommonModule],
  templateUrl: './new-request.component.html',
  styleUrl: './new-request.component.css'
})
export class NewRequestComponent {
  descEquipamento:string = '';
  categoria:number = 1;
  defeito:string = '';
  data:Date = new Date
  request: MaintenceRequest | null = null;
  categorias: CategoriaDeEquipamento[] = [];

  constructor(private router: Router, private RequestsService: RequestsService,private categoriaService: EquipmentCategoryService, private authService: AuthService) {}

  ngOnInit(){
    this.listarTodos()
    console.log(this.categorias)
  }

  listarTodos() {
    this.categoriaService.listarTodos().subscribe({
      next: (dados: CategoriaDeEquipamento[] | null) => {
        if(dados != null){
          this.categorias = dados;
        }
      }
    })
  }

  newRequestAction(){
    const estado:estadoSolicitacao = {
      descricao: '',
      id: 1,
    }

    const user = this.authService.getCurrentCustomer();

    console.log(user);

    const categoriaEq:CategoriaEquipamento = {
      id: String(this.categoria),
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
