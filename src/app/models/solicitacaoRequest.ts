import { Customer } from "./customer/customer";
import { RequestStatus } from "./enums/requestStatus";

export interface SolicitacaoRequest{

    estadoSolicitacao: estadoSolicitacao,
    dataHoraCriacao: Date,
    id: number,
    descricao:String,
    cliente: Customer,
    descricaoDefeito: string,
    motivoRejeicao:String,
    descricaoEquipamento:String
    categoriaEquipamento:CategoriaEquipamento
  

}

export interface estadoSolicitacao{
    descricao: String,
    id: Number,

}

export interface CategoriaEquipamento {
    id: String,
    descricao: String
}