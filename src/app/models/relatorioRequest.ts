export interface RelatorioRequest {
  idSolicitacao: number;
  estadoSolicitacao: string;
  categoriaEquipamento: string;
  descricaoEquipamento: string;
  descricaoDefeito: string;
  dataHoraCriacaoSolicitacao: Date;
  dataHoraPagamento: Date;
  dataHoraManutencao: Date;
  valorOrcamentoAprovado: number;
}