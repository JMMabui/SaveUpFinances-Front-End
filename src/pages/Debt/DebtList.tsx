import React, { useState } from 'react';
import { Debt } from '../../types/Debt';
import { Button } from '../../components/Button';
import { FiEdit2, FiCheckCircle, FiTrash2, FiAlertCircle, FiClock } from 'react-icons/fi';

interface DebtListProps {
  debts: Debt[];
  onAdd: () => void;
  onEdit: (debt: Debt) => void;
  onPay: (debtId: string) => void;
}

function isVencida(debt: Debt) {
  return debt.status === 'pendente' && new Date(debt.dataVencimento) < new Date();
}

export const DebtList: React.FC<DebtListProps> = ({ debts, onAdd, onEdit, onPay }) => {
  const [statusFilter, setStatusFilter] = useState<'todas' | 'pendente' | 'paga'>('todas');
  // Ordenar por data de vencimento (mais próximas primeiro)
  const filteredDebts = debts
    .filter(d => statusFilter === 'todas' || d.status === statusFilter)
    .sort((a, b) => new Date(a.dataVencimento).getTime() - new Date(b.dataVencimento).getTime());

  // Totalizadores
  const totalPendentes = debts.filter(d => d.status === 'pendente').reduce((acc, d) => acc + d.valor, 0);
  const totalPagas = debts.filter(d => d.status === 'paga').reduce((acc, d) => acc + d.valor, 0);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-2">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-800">Dívidas</h2>
        <Button onClick={onAdd} title="Adicionar nova dívida (Ctrl + N)">Adicionar Dívida</Button>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="flex gap-4">
          <span className="bg-gradient-to-r from-orange-200 to-orange-100 text-orange-800 px-4 py-1 rounded-full text-base font-semibold flex items-center gap-2 shadow-sm">
            <FiAlertCircle /> Pendentes: R$ {totalPendentes.toFixed(2)}
          </span>
          <span className="bg-gradient-to-r from-green-200 to-green-100 text-green-800 px-4 py-1 rounded-full text-base font-semibold flex items-center gap-2 shadow-sm">
            <FiCheckCircle /> Pagas: R$ {totalPagas.toFixed(2)}
          </span>
        </div>
        <div>
          <label className="mr-2 font-medium">Filtrar:</label>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)} className="border rounded px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-400">
            <option value="todas">Todas</option>
            <option value="pendente">Pendentes</option>
            <option value="paga">Pagas</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] rounded-2xl shadow-lg overflow-hidden bg-white">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-500 to-blue-400 text-white">
              <th className="p-4 text-left font-semibold">Descrição</th>
              <th className="p-4 text-left font-semibold">Valor</th>
              <th className="p-4 text-left font-semibold">Credor</th>
              <th className="p-4 text-left font-semibold">Vencimento</th>
              <th className="p-4 text-left font-semibold">Status</th>
              <th className="p-4 text-left font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredDebts.map(debt => (
              <tr key={debt.id} className={`transition-all duration-200 ${isVencida(debt) ? 'bg-red-50' : 'hover:bg-indigo-50'} border-b last:border-b-0 shadow-sm`}>
                <td className="p-4 font-medium text-gray-800">{debt.descricao}</td>
                <td className="p-4 text-gray-700">{debt.valor.toFixed(2)} MT</td>
                <td className="p-4 text-gray-700">{debt.credor}</td>
                <td className="p-4 flex items-center gap-2 text-gray-700">
                  {new Date(debt.dataVencimento).toLocaleDateString()}
                  {isVencida(debt) && (
                    <span className="inline-flex items-center gap-1 text-xs text-red-600 font-semibold ml-1" title="Dívida vencida">
                      <FiClock /> Vencida
                    </span>
                  )}
                </td>
                <td className="p-4">
                  {debt.status === 'paga' ? (
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-green-200 to-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                      <FiCheckCircle size={14} /> Paga
                    </span>
                  ) : isVencida(debt) ? (
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-red-200 to-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                      <FiClock size={14} /> Vencida
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-orange-200 to-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                      <FiAlertCircle size={14} /> Pendente
                    </span>
                  )}
                </td>
                <td className="p-4 flex gap-2">
                  <button title="Editar dívida" className="rounded-full p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 shadow transition-all" onClick={() => onEdit(debt)}>
                    <FiEdit2 size={18} />
                  </button>
                  {debt.status === 'pendente' && (
                    <button title="Registrar pagamento" className="rounded-full p-2 bg-green-50 hover:bg-green-100 text-green-600 shadow transition-all" onClick={() => onPay(debt.id)}>
                      <FiCheckCircle size={18} />
                    </button>
                  )}
                  <button title="Excluir dívida" className="rounded-full p-2 bg-red-50 hover:bg-red-100 text-red-600 shadow transition-all">
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
