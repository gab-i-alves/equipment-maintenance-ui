import { Customer } from "./customer/customer";
import { Employee } from "./employee/employee";
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
    categoriaEquipamento:CategoriaEquipamento,
    funcionarioManutencao: Employee|null

}

export interface estadoSolicitacao{
    descricao: String,
    id: Number,

}

export interface CategoriaEquipamento {
    id: String,
    descricao: String
}