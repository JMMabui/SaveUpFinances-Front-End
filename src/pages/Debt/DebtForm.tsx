import React, { useState } from 'react';
import { Debt } from '../../types/Debt';
import { Button } from '../../components/Button';

interface DebtFormProps {
  initialDebt?: Debt;
  onSave: (debt: Debt) => void;
  onCancel: () => void;
}

export const DebtForm: React.FC<DebtFormProps> = ({ initialDebt, onSave, onCancel }) => {
  const [descricao, setDescricao] = useState(initialDebt?.descricao || '');
  const [valor, setValor] = useState(initialDebt?.valor || 0);
  const [credor, setCredor] = useState(initialDebt?.credor || '');
  const [dataVencimento, setDataVencimento] = useState(initialDebt?.dataVencimento || '');
  const [status, setStatus] = useState<'pendente' | 'paga'>(initialDebt?.status || 'pendente');
  const [observacoes, setObservacoes] = useState(initialDebt?.observacoes || '');
  const [touched, setTouched] = useState<{[k:string]: boolean}>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!descricao || !valor || !credor || !dataVencimento) return setTouched({descricao: true, valor: true, credor: true, dataVencimento: true});
    onSave({
      id: initialDebt?.id || Math.random().toString(36).substr(2, 9),
      descricao,
      valor,
      credor,
      dataVencimento,
      status,
      observacoes,
      dataPagamento: status === 'paga' ? new Date().toISOString() : undefined,
    });
  }

  function handleBlur(field: string) {
    setTouched(prev => ({...prev, [field]: true}));
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold mb-4">{initialDebt ? 'Editar Dívida' : 'Nova Dívida'}</h2>
      <div>
        <label className="block font-medium mb-1">Descrição *</label>
        <input className={`border rounded px-3 py-2 w-full ${touched.descricao && !descricao ? 'border-red-400' : ''}`} value={descricao} onChange={e => setDescricao(e.target.value)} onBlur={() => handleBlur('descricao')} placeholder="Ex: Empréstimo Banco" required />
        {touched.descricao && !descricao && <span className="text-xs text-red-500">Campo obrigatório</span>}
      </div>
      <div>
        <label className="block font-medium mb-1">Valor *</label>
        <input type="number" className={`border rounded px-3 py-2 w-full ${touched.valor && !valor ? 'border-red-400' : ''}`} value={valor} onChange={e => setValor(Number(e.target.value))} onBlur={() => handleBlur('valor')} placeholder="R$ 0,00" required />
        {touched.valor && !valor && <span className="text-xs text-red-500">Campo obrigatório</span>}
      </div>
      <div>
        <label className="block font-medium mb-1">Credor *</label>
        <input className={`border rounded px-3 py-2 w-full ${touched.credor && !credor ? 'border-red-400' : ''}`} value={credor} onChange={e => setCredor(e.target.value)} onBlur={() => handleBlur('credor')} placeholder="Ex: Banco XYZ" required />
        {touched.credor && !credor && <span className="text-xs text-red-500">Campo obrigatório</span>}
      </div>
      <div>
        <label className="block font-medium mb-1">Data de Vencimento *</label>
        <input type="date" className={`border rounded px-3 py-2 w-full ${touched.dataVencimento && !dataVencimento ? 'border-red-400' : ''}`} value={dataVencimento} onChange={e => setDataVencimento(e.target.value)} onBlur={() => handleBlur('dataVencimento')} required />
        {touched.dataVencimento && !dataVencimento && <span className="text-xs text-red-500">Campo obrigatório</span>}
      </div>
      <div>
        <label className="block font-medium mb-1">Status</label>
        <select className="border rounded px-3 py-2 w-full" value={status} onChange={e => setStatus(e.target.value as any)}>
          <option value="pendente">Pendente</option>
          <option value="paga">Paga</option>
        </select>
      </div>
      <div>
        <label className="block font-medium mb-1">Observações</label>
        <textarea className="border rounded px-3 py-2 w-full" value={observacoes} onChange={e => setObservacoes(e.target.value)} placeholder="Opcional" />
      </div>
      <div className="flex gap-2 mt-4">
        <Button type="submit">Salvar</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>Cancelar</Button>
      </div>
    </form>
  );
};
