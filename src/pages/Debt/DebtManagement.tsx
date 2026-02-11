import { useState } from 'react'
import { MainLayout } from '@/components/layout/mainLayout'
import { Button } from '@/components/ui/button'
import { COLORS } from '@/constants/colors'
import {
  useCreateDebt,
  useGetDebtsByUser,
  useUpdateDebt,
} from '@/lib/HTTP/debts'
import { useCreateDebtPayment } from '@/lib/HTTP/debts-payments'
import type { debtsRequest, debtsResponse } from '@/lib/HTTP/Type/debts.type'
import { DebtForm } from './DebtForm'
import { DebtList } from './DebtList'
import { DebtPaymentForm } from './DebtPaymentForm'

export function DebtManagement() {
  const userId =
    typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''

  const { data } = useGetDebtsByUser(userId)
  const createDebt = useCreateDebt()
  const [editingDebt, setEditingDebt] = useState<debtsResponse | null>(null)
  const updateDebt = useUpdateDebt()
  const createPayment = useCreateDebtPayment()

  const debtsApi: debtsResponse[] = data?.data || []
  const [showForm, setShowForm] = useState(false)
  const [payingDebt, setPayingDebt] = useState<any | null>(null)

  function handleAdd() {
    setEditingDebt(null)
    setShowForm(true)
  }

  function handleEdit(debt: debtsResponse) {
    setEditingDebt(debt)
    setShowForm(true)
  }

  function handleSave(debt: debtsRequest) {
    if (editingDebt?.id) {
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

  if (showForm) {
    return (
      <MainLayout>
        <DebtForm
          initialDebt={editingDebt!}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </MainLayout>
    )
  }

  if (payingDebt) {
    return (
      <MainLayout>
        <DebtPaymentForm
          valorOriginal={payingDebt.amount}
          onSave={handleSavePayment}
          onCancel={handleCancelPayment}
        />
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2
            className="text-2xl font-bold"
            style={{ color: COLORS.black[800] }}
          >
            Dívidas
          </h2>
          <Button onClick={handleAdd}>Nova Dívida</Button>
        </div>

        <DebtList
          debts={debtsApi as any}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onPay={handlePay}
        />
      </div>
    </MainLayout>
  )
}
