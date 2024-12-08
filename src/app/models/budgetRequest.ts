import { Employee } from "./employee/employee";
import { SolicitacaoRequest } from "./solicitacaoRequest";

export interface BudgetRequest{
  idOrcamento: Number,
  valorOrcamento: Number,
  aprovado: boolean,
  rejeitado: boolean,
  motivoRejeicao: String,
  dataHoraRejeicao: Date|null,
  dataHoraCriacao: Date,
  dataHoraAprovacao: Date|null,
  funcionario: Employee,
  solicitacao: SolicitacaoRequest,
  idFuncionario: Number,
  nomeFuncionario: String,
}