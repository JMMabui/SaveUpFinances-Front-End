import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useApi } from '@/hooks/useApi'
import { useAuth } from '@/hooks/useAuth'
import {
  accountsService,
  debtPaymentsService,
  debtsService,
} from '@/lib/apiServices'

interface DebtPaymentModalProps {
  payment: any | null
  onClose: () => void
  onSuccess: () => void
}

const DebtPaymentModal = ({
  payment,
  onClose,
  onSuccess,
}: DebtPaymentModalProps) => {
  const { execute, loading } = useApi()
  const { user } = useAuth()
  const [debts, setDebts] = useState<any[]>([])
  const [accounts, setAccounts] = useState<any[]>([])
  const [formData, setFormData] = useState({
    amount: '',
    date: '',
    debtId: '',
    accountId: '',
    notes: '',
  })

  useEffect(() => {
    loadDependencies()
    if (payment) {
      setFormData({
        amount: payment.amount || '',
        date: payment.date ? dayjs(payment.date).format('YYYY-MM-DD') : '',
        debtId: payment.debtId || '',
        accountId: payment.accountId || '',
        notes: payment.notes || '',
      })
    }
  }, [payment])

  const loadDependencies = async () => {
    try {
      const debtsPromise = execute(() => debtsService.getAll())
      const accountsPromise = user?.id
        ? execute(() => accountsService.getByUserId(user.id))
        : Promise.resolve(null)
      const [debtsResp, accountsResp] = await Promise.all([
        debtsPromise,
        accountsPromise,
      ])
      if (debtsResp?.data)
        setDebts(Array.isArray(debtsResp.data) ? debtsResp.data : [])
      if (accountsResp && (accountsResp as any)?.data)
        setAccounts(Array.isArray(accountsResp.data) ? accountsResp.data : [])
    } catch (error) {
      console.error('Erro ao carregar dependências:', error)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const dataToSend = {
        ...formData,
        amount: parseFloat(formData.amount),
        date: new Date(formData.date),
        userId: user?.id,
      }

      if (payment?.id) {
        await execute(() => debtPaymentsService.update(payment.id, dataToSend))
      } else {
        await execute(() => debtPaymentsService.create(dataToSend))
      }
      onSuccess()
    } catch (_error) {
      alert('Erro ao salvar pagamento')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <Card className="p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {payment ? 'Editar Pagamento' : 'Novo Pagamento de Dívida'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Dívida</label>
            <select
              name="debtId"
              value={formData.debtId}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Selecione uma dívida</option>
              {debts.map(debt => (
                <option key={debt.id} value={debt.id}>
                  {debt.description} - {debt.amount}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Valor</label>
            <Input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Data</label>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Conta (Opcional)
            </label>
            <select
              name="accountId"
              value={formData.accountId}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Selecione uma conta</option>
              {accounts.map(account => (
                <option key={account.id} value={account.id}>
                  {account.accountName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Notas</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Observações adicionais..."
              className="w-full border rounded px-3 py-2 text-sm"
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default DebtPaymentModal
