export interface SolicitacaoHistorico {
    id: number;
    descricao: string;
    dataHora: Date;
    status: string;
    funcionario?: {
      id: number;
      nome: string;
    };
  }