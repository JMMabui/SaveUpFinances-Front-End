import React, { useState } from 'react';

interface DebtPaymentFormProps {
  valorOriginal: number;
  onSave: (data: { valorPago: number; dataPagamento: string; observacoes?: string }) => void;
  onCancel: () => void;
}

export const DebtPaymentForm: React.FC<DebtPaymentFormProps> = ({ valorOriginal, onSave, onCancel }) => {
  const [valorPago, setValorPago] = useState(valorOriginal);
  const [dataPagamento, setDataPagamento] = useState(() => new Date().toISOString().slice(0, 10));
  const [observacoes, setObservacoes] = useState('');
  const [touched, setTouched] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!valorPago || valorPago <= 0) return;
    onSave({ valorPago, dataPagamento, observacoes });
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold mb-4">Registrar Pagamento</h2>
      <div>
        <label className="block font-medium mb-1">Valor pago *</label>
        <input type="number" className={`border rounded px-3 py-2 w-full ${touched && (!valorPago || valorPago <= 0) ? 'border-red-400' : ''}`} value={valorPago} onChange={e => setValorPago(Number(e.target.value))} min={1} max={valorOriginal} required />
        {touched && (!valorPago || valorPago <= 0) && <span className="text-xs text-red-500">Informe um valor válido</span>}
      </div>
      <div>
        <label className="block font-medium mb-1">Data do pagamento *</label>
        <input type="date" className="border rounded px-3 py-2 w-full" value={dataPagamento} onChange={e => setDataPagamento(e.target.value)} required />
      </div>
      <div>
        <label className="block font-medium mb-1">Observações</label>
        <textarea className="border rounded px-3 py-2 w-full" value={observacoes} onChange={e => setObservacoes(e.target.value)} placeholder="Opcional" />
      </div>
      <div className="flex gap-2 mt-4">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Salvar</button>
        <button type="button" className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};
