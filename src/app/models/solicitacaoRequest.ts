import { Customer } from "./customer/customer";
import { Employee } from "./employee/employee";
import { RequestStatus } from "./enums/requestStatus";

export interface estadoSolicitacao {
    descricao: string;
    id: number;
}

export interface SolicitacaoRequest {
    estadoSolicitacao: estadoSolicitacao;
    dataHoraCriacao: Date;
    id: number;
    descricao: string;
    cliente: Customer;
    descricaoDefeito: string;
    motivoRejeicao: string;
    descricaoEquipamento: string;
    categoriaEquipamento: CategoriaEquipamento;
    funcionarioManutencao: Employee | null;
    budget?: {
        dataHoraCriacao: Date;
        dataHoraAprovacao: Date;
    };
    dataHoraManutencao?: Date;
    dataHoraPagamento?: Date;
}

export interface CategoriaEquipamento {
    id: string;
    descricao: string;
}
