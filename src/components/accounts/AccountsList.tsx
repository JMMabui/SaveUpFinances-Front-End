import { useMemo, useState } from 'react'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { COLORS } from '@/constants/colors'
import { formatCurrency } from '@/lib/utils'
import type { accountResponse } from '@/lib/HTTP/Type/account.type'
import { AccountCard } from './AccountCard'

interface AccountsListProps {
  accounts: accountResponse[]
  banks: any[]
  onEdit: (account: any) => void
  onDelete: (id: string) => void
}

const ACCOUNT_TYPES = [
  { value: 'current', label: 'Corrente' },
  { value: 'savings', label: 'Poupança' },
  { value: 'salary', label: 'Salário' },
  { value: 'investment', label: 'Investimento' },
  { value: 'digital', label: 'Digital' },
  { value: 'joint', label: 'Conjunta' },
]

export function AccountsList({
  accounts,
  banks,
  onEdit,
  onDelete,
}: AccountsListProps) {
  const [bankFilter, setBankFilter] = useState<string>('')
  const [typeFilter, setTypeFilter] = useState<string>('')

  const filteredAccounts = useMemo(() => {
    return accounts.filter(
      acc =>
        (bankFilter ? acc.bankId === bankFilter : true) &&
        (typeFilter ? acc.accountType === typeFilter : true)
    )
  }, [accounts, bankFilter, typeFilter])

  const totalBalance = useMemo(
    () => filteredAccounts.reduce((s, a) => s + (Number(a.balance) || 0), 0),
    [filteredAccounts]
  )

  const totalsByType = useMemo(() => {
    const map = new Map<string, number>()
    for (const acc of filteredAccounts) {
      map.set(
        acc.accountType,
        (map.get(acc.accountType) || 0) + (Number(acc.balance) || 0)
      )
    }
    return ACCOUNT_TYPES.map(t => ({
      type: t.value,
      label: t.label,
      total: map.get(t.value) || 0,
    }))
  }, [filteredAccounts])

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <Card className="border" style={{ borderColor: COLORS.blue[100] }}>
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: COLORS.black[700] }}
            >
              Banco
            </label>
            <Select
              value={bankFilter || 'all'}
              onValueChange={v => setBankFilter(v === 'all' ? '' : v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {banks.map((b: any) => (
                  <SelectItem key={b.id} value={b.id}>
                    {b.bankName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: COLORS.black[700] }}
            >
              Tipo
            </label>
            <Select
              value={typeFilter || 'all'}
              onValueChange={v => setTypeFilter(v === 'all' ? '' : v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {ACCOUNT_TYPES.map(t => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border" style={{ borderColor: COLORS.blue[100] }}>
          <div className="p-4">
            <h3
              className="text-sm font-medium"
              style={{ color: COLORS.black[600] }}
            >
              Saldo Total (filtro)
            </h3>
            <p
              className="mt-2 text-2xl font-semibold"
              style={{ color: COLORS.green[600] }}
            >
              {formatCurrency(totalBalance).replace('MZN ', '')} Mt
            </p>
          </div>
        </Card>
        {totalsByType
          .filter(x => x.total > 0)
          .slice(0, 2)
          .map(x => (
            <Card
              key={x.type}
              className="border"
              style={{ borderColor: COLORS.blue[100] }}
            >
              <div className="p-4">
                <h3
                  className="text-sm font-medium"
                  style={{ color: COLORS.black[600] }}
                >
                  {x.label}
                </h3>
                <p
                  className="mt-2 text-xl font-semibold"
                  style={{ color: COLORS.black[800] }}
                >
                  {formatCurrency(x.total).replace('MZN ', '')} Mt
                </p>
              </div>
            </Card>
          ))}
      </div>

      {/* Bancos disponíveis */}
      <div>
        <h3
          className="text-lg font-semibold mb-2"
          style={{ color: COLORS.black[800] }}
        >
          Bancos Disponíveis
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {banks.map((b: any) => (
            <Card
              key={b.id}
              className="border"
              style={{ borderColor: COLORS.blue[100] }}
            >
              <div className="p-3 flex items-center gap-2">
                {b.logoUrl ? (
                  <img
                    src={b.logoUrl}
                    alt={b.bankName}
                    className="w-6 h-6 object-contain"
                  />
                ) : (
                  <div
                    className="w-6 h-6 rounded"
                    style={{ backgroundColor: COLORS.blue[100] }}
                  />
                )}
                <span className="text-sm" style={{ color: COLORS.black[700] }}>
                  {b.bankName}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Lista de contas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAccounts.map(acc => (
          <AccountCard
            key={acc.id}
            acc={acc}
            banks={banks}
            onEdit={() => onEdit(acc)}
            onDelete={() => onDelete(acc.id)}
          />
        ))}
      </div>
    </div>
  )
}
