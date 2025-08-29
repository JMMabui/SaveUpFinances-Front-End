import React, { useState } from 'react';
import { Debt } from '../../types/Debt';
import { Button } from '../../components/Button';
import { FiEdit2, FiCheckCircle, FiTrash2, FiAlertCircle, FiClock } from 'react-icons/fi';
import { COLORS } from '@/constants/colors';

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
  const filteredDebts = debts
    .filter(d => statusFilter === 'todas' || d.status === statusFilter)
    .sort((a, b) => new Date(a.dataVencimento).getTime() - new Date(b.dataVencimento).getTime());

  const totalPendentes = debts.filter(d => d.status === 'pendente').reduce((acc, d) => acc + d.valor, 0);
  const totalPagas = debts.filter(d => d.status === 'paga').reduce((acc, d) => acc + d.valor, 0);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-2">
        <h2 className="text-3xl font-extrabold tracking-tight" style={{ color: COLORS.black[800] }}>Dívidas</h2>
        <Button onClick={onAdd} title="Adicionar nova dívida (Ctrl + N)">Adicionar Dívida</Button>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="flex gap-4">
          <span className="px-4 py-1 rounded-full text-base font-semibold flex items-center gap-2 shadow-sm" style={{ background: COLORS.yellow[100], color: COLORS.yellow[800] }}>
            <FiAlertCircle /> Pendentes: MT {totalPendentes.toFixed(2)}
          </span>
          <span className="px-4 py-1 rounded-full text-base font-semibold flex items-center gap-2 shadow-sm" style={{ background: COLORS.green[100], color: COLORS.green[800] }}>
            <FiCheckCircle /> Pagas: MT {totalPagas.toFixed(2)}
          </span>
        </div>
        <div>
          <label className="mr-2 font-medium" style={{ color: COLORS.black[700] }}>Filtrar:</label>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)} className="border rounded px-3 py-2 shadow-sm focus:ring-2" style={{ borderColor: COLORS.blue[200] }}>
            <option value="todas">Todas</option>
            <option value="pendente">Pendentes</option>
            <option value="paga">Pagas</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] rounded-2xl shadow-lg overflow-hidden bg-white">
          <thead>
            <tr style={{ background: `linear-gradient(to right, ${COLORS.blue[500]}, ${COLORS.blue[400]})`, color: 'white' }}>
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
              <tr key={debt.id} className={`transition-all duration-200 ${isVencida(debt) ? 'bg-red-50' : ''} hover:bg-blue-50 border-b last:border-b-0 shadow-sm`}>
                <td className="p-4 font-medium" style={{ color: COLORS.black[800] }}>{debt.descricao}</td>
                <td className="p-4" style={{ color: COLORS.black[700] }}>MT {debt.valor.toFixed(2)}</td>
                <td className="p-4" style={{ color: COLORS.black[700] }}>{debt.credor}</td>
                <td className="p-4 flex items-center gap-2" style={{ color: COLORS.black[700] }}>
                  {new Date(debt.dataVencimento).toLocaleDateString()}
                  {isVencida(debt) && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold ml-1" style={{ color: '#dc2626' }} title="Dívida vencida">
                      <FiClock /> Vencida
                    </span>
                  )}
                </td>
                <td className="p-4">
                  {debt.status === 'paga' ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold shadow-sm" style={{ background: COLORS.green[100], color: COLORS.green[800] }}>
                      <FiCheckCircle size={14} /> Paga
                    </span>
                  ) : isVencida(debt) ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold shadow-sm" style={{ background: '#fecaca', color: '#991b1b' }}>
                      <FiClock size={14} /> Vencida
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold shadow-sm" style={{ background: COLORS.yellow[100], color: COLORS.yellow[800] }}>
                      <FiAlertCircle size={14} /> Pendente
                    </span>
                  )}
                </td>
                <td className="p-4 flex gap-2">
                  <button title="Editar dívida" className="rounded-full p-2 shadow transition-all" style={{ background: COLORS.blue[50], color: COLORS.blue[600] }} onClick={() => onEdit(debt)}>
                    <FiEdit2 size={18} />
                  </button>
                  {debt.status === 'pendente' && (
                    <button title="Registrar pagamento" className="rounded-full p-2 shadow transition-all" style={{ background: COLORS.green[50], color: COLORS.green[600] }} onClick={() => onPay(debt.id)}>
                      <FiCheckCircle size={18} />
                    </button>
                  )}
                  <button title="Excluir dívida" className="rounded-full p-2 shadow transition-all" style={{ background: '#fee2e2', color: '#dc2626' }}>
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
