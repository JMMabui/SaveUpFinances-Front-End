import { useState } from 'react'
import { Header } from '@/components/layout/header'
import {
  useCreateDebt,
  useGetDebtsByUser,
  useUpdateDebt,
} from '@/lib/HTTP/debts'
import { useCreateDebtPayment } from '@/lib/HTTP/debts-payments'
import { DebtForm } from './DebtForm'
import { DebtList } from './DebtList'
import { DebtPaymentForm } from './DebtPaymentForm'

export function DebtManagement() {
  const userId =
    typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''

  const { data } = useGetDebtsByUser(userId)
  const createDebt = useCreateDebt()
  const updateDebt = useUpdateDebt('')
  const createPayment = useCreateDebtPayment()

  const debtsApi = data?.data || []
  const [editingDebt, setEditingDebt] = useState<any | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [payingDebt, setPayingDebt] = useState<any | null>(null)

  function handleAdd() {
    setEditingDebt(null)
    setShowForm(true)
  }

  function handleEdit(debt: any) {
    setEditingDebt(debt)
    setShowForm(true)
  }

  function handleSave(debt: any) {
    if (debt?.id) {
      updateDebt.mutate({ ...debt })
    } else {
      createDebt.mutate({ ...debt, userId })
    }
    setShowForm(false)
  }

  function handlePay(debtId: string) {
    const debt = debtsApi.find((d: any) => d.id === debtId)
    if (debt) setPayingDebt(debt)
  }

  function handleSavePayment(data: {
    valorPago: number
    dataPagamento: string
    observacoes?: string
  }) {
    if (!payingDebt) return
    createPayment.mutate({
      amount: data.valorPago,
      date: data.dataPagamento,
      debtId: payingDebt.id,
      notes: data.observacoes,
    } as any)
    setPayingDebt(null)
  }

  function handleCancelPayment() {
    setPayingDebt(null)
  }

  function handleCancel() {
    setShowForm(false)
  }

  return (
    <div>
      <Header />
      {showForm ? (
        <DebtForm
          initialDebt={editingDebt!}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : payingDebt ? (
        <DebtPaymentForm
          valorOriginal={payingDebt.amount}
          onSave={handleSavePayment}
          onCancel={handleCancelPayment}
        />
      ) : (
        <DebtList
          debts={debtsApi as any}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onPay={handlePay}
        />
      )}
    </div>
  )
}
