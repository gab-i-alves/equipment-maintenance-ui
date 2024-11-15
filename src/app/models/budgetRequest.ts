import { SolicitacaoRequest } from "./solicitacaoRequest";

export interface BudgetRequest{
  idOrcamento: Number,
  valorOrcamento: Number,
  aprovado: boolean,
  rejeitado: boolean,
  motivoRejeicao: String,
  dataHoraRejeicao: Date,
  dataHoraCriacao: Date,
  dataHoraAprovacao: Date,
  idFuncionario: Number,
  nomeFuncionario: String,
  solicitacao: SolicitacaoRequest
}