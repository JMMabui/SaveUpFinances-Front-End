import { useMemo, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/Button'
import { Header } from '@/components/Header'
import { getAccountsByUserId, useCreateAccount, useUpdateAccount, useDeleteAccount } from '@/HTTP/account'
import { useGetBanks } from '@/HTTP/banks'
import { COLORS } from '@/constants/colors'
import { useGetAccountBalanceByAccount, useCreateAccountBalance } from '@/HTTP/account-balance'
import { useCreateTransaction } from '@/HTTP/transactions'

interface AccountFormState {
  id?: string
  accountName: string
  accountType: string
  accountHolderName?: string
  balance: number
  bankId?: string | null
  currency?: string
  isActive?: boolean
  isDefault?: boolean
}

const ACCOUNT_TYPES = [
  { value: 'current', label: 'Corrente' },
  { value: 'savings', label: 'Poupança' },
  { value: 'salary', label: 'Salário' },
  { value: 'investment', label: 'Investimento' },
  { value: 'digital', label: 'Digital' },
  { value: 'joint', label: 'Conjunta' },
]

export function AccountsPage() {
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''
  const { data } = getAccountsByUserId(userId)
  const accounts: any[] = Array.isArray(data?.data) ? data?.data as any[] : []

  const { data: banksData } = useGetBanks()
  const banks = banksData?.data || []

  const createAccount = useCreateAccount()
  const updateAccount = useUpdateAccount('')
  const [editing, setEditing] = useState<AccountFormState | null>(null)
  const del = useDeleteAccount()

  const [bankFilter, setBankFilter] = useState<string>('')
  const [typeFilter, setTypeFilter] = useState<string>('')

  const [transferOpen, setTransferOpen] = useState(false)
  const [transferState, setTransferState] = useState<{ fromId: string; toId: string; amount: number }>({ fromId: '', toId: '', amount: 0 })

  const filteredAccounts = useMemo(() => {
    return accounts.filter(acc =>
      (bankFilter ? acc.bankId === bankFilter : true) &&
      (typeFilter ? acc.accountType === typeFilter : true)
    )
  }, [accounts, bankFilter, typeFilter])

  const totalBalance = useMemo(() => filteredAccounts.reduce((s, a) => s + (a.balance || 0), 0), [filteredAccounts])

  const totalsByType = useMemo(() => {
    const map = new Map<string, number>()
    for (const acc of filteredAccounts) {
      map.set(acc.accountType, (map.get(acc.accountType) || 0) + (acc.balance || 0))
    }
    return ACCOUNT_TYPES.map(t => ({ type: t.value, label: t.label, total: map.get(t.value) || 0 }))
  }, [filteredAccounts])

  return (
    <div className="space-y-6">
      <Header />

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold" style={{ color: COLORS.black[800] }}>Contas</h2>
        <div className="flex gap-2">
          <Button onClick={() => setTransferOpen(true)} variant="secondary">Transferir</Button>
          <Button onClick={() => setEditing({ accountName: '', accountType: 'current', balance: 0, bankId: null, isActive: true, isDefault: false })}>Nova Conta</Button>
        </div>
      </div>

      {/* Filtros */}
      <Card className="border" style={{ borderColor: COLORS.blue[100] }}>
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>Banco</label>
            <select className="w-full p-2 border rounded" value={bankFilter} onChange={e => setBankFilter(e.target.value)}>
              <option value="">Todos</option>
              {banks.map((b: any) => (
                <option key={b.id} value={b.id}>{b.bankName}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>Tipo</label>
            <select className="w-full p-2 border rounded" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
              <option value="">Todos</option>
              {ACCOUNT_TYPES.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border" style={{ borderColor: COLORS.blue[100] }}>
          <div className="p-4">
            <h3 className="text-sm font-medium" style={{ color: COLORS.black[600] }}>Saldo Total (filtro)</h3>
            <p className="mt-2 text-2xl font-semibold" style={{ color: COLORS.green[600] }}>
              {totalBalance.toLocaleString()} Mt
            </p>
          </div>
        </Card>
        {totalsByType.filter(x => x.total > 0).slice(0, 2).map(x => (
          <Card key={x.type} className="border" style={{ borderColor: COLORS.blue[100] }}>
            <div className="p-4">
              <h3 className="text-sm font-medium" style={{ color: COLORS.black[600] }}>{x.label}</h3>
              <p className="mt-2 text-xl font-semibold" style={{ color: COLORS.black[800] }}>{x.total.toLocaleString()} Mt</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Bancos disponíveis */}
      <div>
        <h3 className="text-lg font-semibold mb-2" style={{ color: COLORS.black[800] }}>Bancos Disponíveis</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {banks.map((b: any) => (
            <Card key={b.id} className="border" style={{ borderColor: COLORS.blue[100] }}>
              <div className="p-3 flex items-center gap-2">
                {b.logoUrl ? (
                  <img src={b.logoUrl} alt={b.bankName} className="w-6 h-6 object-contain" />
                ) : (
                  <div className="w-6 h-6 rounded" style={{ backgroundColor: COLORS.blue[100] }} />
                )}
                <span className="text-sm" style={{ color: COLORS.black[700] }}>{b.bankName}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Lista de contas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAccounts.map(acc => (
          <AccountCard key={acc.id} acc={acc} banks={banks} onEdit={() => setEditing({ id: acc.id, accountName: acc.accountName, accountType: acc.accountType, balance: acc.balance, bankId: acc.bankId, isActive: acc.isActive, isDefault: acc.isDefault })} onDelete={() => del.mutate(acc.id)} />
        ))}
      </div>

      {editing && <AccountModal initial={editing} onClose={() => setEditing(null)} banks={banks} />}
      {transferOpen && <TransferModal onClose={() => setTransferOpen(false)} accounts={accounts} />}
    </div>
  )
}

function AccountCard({ acc, banks, onEdit, onDelete }: { acc: any, banks: any[], onEdit: () => void, onDelete: () => void }) {
  const update = useUpdateAccount(acc.id)
  const { data: history } = useGetAccountBalanceByAccount(acc.id)
  const balances = history?.data || []
  const addSnapshot = useCreateAccountBalance()

  return (
    <Card className="border" style={{ borderColor: COLORS.blue[100] }}>
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold" style={{ color: COLORS.black[800] }}>{acc.accountName}</h3>
            <p className="text-sm" style={{ color: COLORS.black[600] }}>{acc.accountType} • {banks.find((b: any) => b.id === acc.bankId)?.bankName || '-'}</p>
            <div className="text-xs mt-1" style={{ color: COLORS.black[600] }}>
              {acc.isDefault ? 'Conta padrão' : 'Conta secundária'} • {acc.isActive ? 'Ativa' : 'Inativa'}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={onEdit}>Editar</Button>
            <Button variant="danger" size="sm" onClick={onDelete}>Excluir</Button>
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <span style={{ color: COLORS.black[600] }}>Saldo</span>
          <span className="font-medium" style={{ color: COLORS.black[800] }}>{acc.balance.toLocaleString()} Mt</span>
        </div>
        <div className="flex gap-2 mt-2">
          <Button variant="secondary" size="sm" onClick={() => update.mutate({ isDefault: true })}>Definir como padrão</Button>
          <Button variant="secondary" size="sm" onClick={() => update.mutate({ isActive: !acc.isActive })}>{acc.isActive ? 'Desativar' : 'Ativar'}</Button>
          <Button variant="secondary" size="sm" onClick={() => addSnapshot.mutate({ accountId: acc.id, date: new Date(), balance: acc.balance })}>Salvar saldo atual</Button>
        </div>
        {balances.length > 0 && (
          <div className="mt-3">
            <div className="text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>Histórico de saldo</div>
            <div className="max-h-40 overflow-y-auto space-y-1">
              {balances.slice(0, 6).map((b: any) => (
                <div key={b.id} className="flex justify-between text-xs" style={{ color: COLORS.black[600] }}>
                  <span>{new Date(b.date).toLocaleDateString()}</span>
                  <span>{b.balance.toLocaleString()} Mt</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

function AccountModal({ initial, onClose, banks }: { initial: AccountFormState, onClose: () => void, banks: any[] }) {
  const [form, setForm] = useState<AccountFormState>(initial)
  const create = useCreateAccount()
  const update = useUpdateAccount(form.id || '')

  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-4" style={{ color: COLORS.black[800] }}>{form.id ? 'Editar Conta' : 'Nova Conta'}</h3>
        <form onSubmit={e => {
          e.preventDefault()
          if (form.id) {
            update.mutate({ accountName: form.accountName, accountType: form.accountType, balance: form.balance, bankId: form.bankId || null, isActive: form.isActive, isDefault: form.isDefault } as any)
          } else {
            create.mutate({ userId, accountName: form.accountName, accountType: form.accountType, balance: form.balance, bankId: form.bankId || null, isActive: true, isDefault: false } as any)
          }
          onClose()
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>Nome da Conta</label>
              <input className="w-full p-2 border rounded" value={form.accountName} onChange={e => setForm({ ...form, accountName: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>Tipo</label>
              <select className="w-full p-2 border rounded" value={form.accountType} onChange={e => setForm({ ...form, accountType: e.target.value })}>
                {ACCOUNT_TYPES.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>Banco</label>
              <select className="w-full p-2 border rounded" value={form.bankId || ''} onChange={e => setForm({ ...form, bankId: e.target.value || null })}>
                <option value="">Nenhum</option>
                {banks.map((b: any) => (
                  <option key={b.id} value={b.id}>{b.bankName}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>Saldo</label>
              <input type="number" className="w-full p-2 border rounded" value={form.balance} onChange={e => setForm({ ...form, balance: Number(e.target.value) })} required />
            </div>
            {form.id && (
              <div className="grid grid-cols-2 gap-3">
                <label className="inline-flex items-center gap-2 text-sm" style={{ color: COLORS.black[700] }}>
                  <input type="checkbox" checked={!!form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} /> Ativa
                </label>
                <label className="inline-flex items-center gap-2 text-sm" style={{ color: COLORS.black[700] }}>
                  <input type="checkbox" checked={!!form.isDefault} onChange={e => setForm({ ...form, isDefault: e.target.checked })} /> Padrão
                </label>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="secondary" type="button" onClick={onClose}>Cancelar</Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

function TransferModal({ onClose, accounts }: { onClose: () => void, accounts: any[] }) {
  const [fromId, setFromId] = useState('')
  const [toId, setToId] = useState('')
  const [amount, setAmount] = useState<number>(0)
  const updateFrom = useUpdateAccount(fromId)
  const updateTo = useUpdateAccount(toId)
  const createTx = useCreateTransaction()
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-4" style={{ color: COLORS.black[800] }}>Transferência entre Contas</h3>
        <form onSubmit={async e => {
          e.preventDefault()
          if (!fromId || !toId || !amount || fromId === toId) return
          // Atualiza saldos (otimista simples)
          updateFrom.mutate({ balance: undefined as any })
          updateTo.mutate({ balance: undefined as any })
          // Cria transações (seu backend pode ajustar tipos)
          createTx.mutate({ userId, accountId: fromId, date: new Date().toISOString(), description: `Transferência para ${toId}`, amount: -Math.abs(amount), categoryId: '' } as any)
          createTx.mutate({ userId, accountId: toId, date: new Date().toISOString(), description: `Transferência de ${fromId}`, amount: Math.abs(amount), categoryId: '' } as any)
          onClose()
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>De</label>
              <select className="w-full p-2 border rounded" value={fromId} onChange={e => setFromId(e.target.value)}>
                <option value="">Selecione</option>
                {accounts.map(a => (
                  <option key={a.id} value={a.id}>{a.accountName} — {a.balance.toLocaleString()} Mt</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>Para</label>
              <select className="w-full p-2 border rounded" value={toId} onChange={e => setToId(e.target.value)}>
                <option value="">Selecione</option>
                {accounts.map(a => (
                  <option key={a.id} value={a.id}>{a.accountName} — {a.balance.toLocaleString()} Mt</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>Valor</label>
              <input type="number" className="w-full p-2 border rounded" min={0} step={0.01} value={amount} onChange={e => setAmount(Number(e.target.value))} />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="secondary" type="button" onClick={onClose}>Cancelar</Button>
            <Button type="submit">Transferir</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
