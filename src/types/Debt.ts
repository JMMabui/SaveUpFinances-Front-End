export interface Debt {
    id: string;
    descricao: string;
    valor: number;
    credor: string;
    dataVencimento: string; // ISO date
    status: 'pendente' | 'paga';
    observacoes?: string;
    dataPagamento?: string;
  }
  