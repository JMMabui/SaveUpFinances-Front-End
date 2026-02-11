import type React from 'react'
import { useState } from 'react'
import {
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiEdit2,
  FiTrash2,
} from 'react-icons/fi'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { COLORS } from '@/constants/colors'
import type { debtsResponse } from '@/lib/HTTP/Type/debts.type'

interface DebtListProps {
  debts: debtsResponse[]
  onAdd: () => void
  onEdit: (debt: debtsResponse) => void
  onPay: (debtId: string) => void
}

function isVencida(debt: debtsResponse) {
  return (
    debt.status === 'PENDING' &&
    new Date(debt.dueDate as any as string) < new Date()
  )
}

export const DebtList: React.FC<DebtListProps> = ({
  debts,
  onAdd,
  onEdit,
  onPay,
}) => {
  const [statusFilter, setStatusFilter] = useState<
    'todas' | 'pendente' | 'paga'
  >('todas')
  const filteredDebts = debts
    .filter(
      d =>
        statusFilter === 'todas' ||
        (statusFilter === 'pendente'
          ? d.status === 'PENDING'
          : d.status === 'PAID')
    )
    .sort(
      (a, b) =>
        new Date(a.dueDate as any as string).getTime() -
        new Date(b.dueDate as any as string).getTime()
    )

  const totalPendentes = debts
    .filter(d => d.status === 'PENDING')
    .reduce((acc, d) => acc + (Number(d.amount) || 0), 0)
  const totalPagas = debts
    .filter(d => d.status === 'PAID')
    .reduce((acc, d) => acc + (Number(d.amount) || 0), 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex gap-4 flex-wrap">
            <span
              className="px-4 py-1 rounded-full text-base font-semibold flex items-center gap-2 shadow-sm"
              style={{
                background: COLORS.yellow[100],
                color: COLORS.yellow[800],
              }}
            >
              <FiAlertCircle /> Pendentes: MT {totalPendentes.toFixed(2)}
            </span>
            <span
              className="px-4 py-1 rounded-full text-base font-semibold flex items-center gap-2 shadow-sm"
              style={{
                background: COLORS.green[100],
                color: COLORS.green[800],
              }}
            >
              <FiCheckCircle /> Pagas: MT {totalPagas.toFixed(2)}
            </span>
          </div>
          <div>
            <label
              className="mr-2 font-medium"
              style={{ color: COLORS.black[700] }}
            >
              Filtrar:
            </label>
            <Select
              value={statusFilter}
              onValueChange={value => setStatusFilter(value as any)}
            >
              <SelectTrigger className="w-fit min-w-40">
                <SelectValue placeholder="Filtrar status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="pendente">Pendentes</SelectItem>
                <SelectItem value="paga">Pagas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          title="Nova dívida"
          className="px-4 py-2 rounded shadow"
          style={{ background: COLORS.blue[50], color: COLORS.blue[700] }}
          onClick={onAdd}
        >
          Adicionar
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] rounded-2xl shadow-lg overflow-hidden bg-white">
          <thead>
            <tr
              style={{
                background: `linear-gradient(to right, ${COLORS.blue[500]}, ${COLORS.blue[400]})`,
                color: 'white',
              }}
            >
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
              <tr
                key={debt.id}
                className={`transition-all duration-200 ${isVencida(debt) ? 'bg-red-50' : ''} hover:bg-blue-50 border-b last:border-b-0 shadow-sm`}
              >
                <td
                  className="p-4 font-medium"
                  style={{ color: COLORS.black[800] }}
                >
                  {debt.description}
                </td>
                <td className="p-4" style={{ color: COLORS.black[700] }}>
                  MT {Number(debt.amount || 0).toFixed(2)}
                </td>
                <td className="p-4" style={{ color: COLORS.black[700] }}>
                  {debt.creditor}
                </td>
                <td
                  className="p-4 flex items-center gap-2"
                  style={{ color: COLORS.black[700] }}
                >
                  {new Date(debt.dueDate as any as string).toLocaleDateString()}
                  {isVencida(debt) && (
                    <span
                      className="inline-flex items-center gap-1 text-xs font-semibold ml-1"
                      style={{ color: '#dc2626' }}
                      title="Dívida vencida"
                    >
                      <FiClock /> Vencida
                    </span>
                  )}
                </td>
                <td className="p-4">
                  {debt.status === 'PAID' ? (
                    <span
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold shadow-sm"
                      style={{
                        background: COLORS.green[100],
                        color: COLORS.green[800],
                      }}
                    >
                      <FiCheckCircle size={14} /> Paga
                    </span>
                  ) : isVencida(debt) ? (
                    <span
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold shadow-sm"
                      style={{ background: '#fecaca', color: '#991b1b' }}
                    >
                      <FiClock size={14} /> Vencida
                    </span>
                  ) : (
                    <span
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold shadow-sm"
                      style={{
                        background: COLORS.yellow[100],
                        color: COLORS.yellow[800],
                      }}
                    >
                      <FiAlertCircle size={14} /> Pendente
                    </span>
                  )}
                </td>
                <td className="p-4 flex gap-2">
                  <button
                    type="button"
                    title="Editar dívida"
                    className="rounded-full p-2 shadow transition-all"
                    style={{
                      background: COLORS.blue[50],
                      color: COLORS.blue[600],
                    }}
                    onClick={() => onEdit(debt)}
                  >
                    <FiEdit2 size={18} />
                  </button>
                  {debt.status === 'PENDING' && (
                    <button
                      type="button"
                      title="Registrar pagamento"
                      className="rounded-full p-2 shadow transition-all"
                      style={{
                        background: COLORS.green[50],
                        color: COLORS.green[600],
                      }}
                      onClick={() => debt.id && onPay(debt.id)}
                    >
                      <FiCheckCircle size={18} />
                    </button>
                  )}
                  <button
                    type="button"
                    title="Excluir dívida"
                    className="rounded-full p-2 shadow transition-all"
                    style={{ background: '#fee2e2', color: '#dc2626' }}
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
