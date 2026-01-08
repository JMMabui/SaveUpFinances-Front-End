import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { COLORS } from '@/constants/colors'
import {  investmentRequest } from '@/lib/HTTP/Type/investment.type'
import { useCreateInvestment, useUpdateInvestment } from '@/lib/HTTP/investment'

interface InvestmentModalProps {
  investment: investmentRequest | null
  onClose: () => void
}

export const InvestmentModal: React.FC<InvestmentModalProps> = ({
  investment,
  onClose,
}) => {
  const [formData, setFormData] = useState<Partial<investmentRequest>>(
    investment || {
      investimentName: '',
      amount: 0,
      investmentTypeId: '',
      investmentGoalId: null,
      notes: '',
    }
  )

  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''
  const create = useCreateInvestment()
  const update = useUpdateInvestment(investment?.id || '')

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-4" style={{ color: COLORS.black[800] }}>
          {investment ? 'Editar Investimento' : 'Novo Investimento'}
        </h3>

        <form
          onSubmit={e => {
            e.preventDefault()
            if (investment) {
              update.mutate({
                investimentName: formData.investimentName!,
                amount: formData.amount!,
                investmentTypeId: formData.investmentTypeId!,
                investmentGoalId: formData.investmentGoalId ?? null,
                notes: formData.notes || null,
              } as any)
            } else {
              create.mutate({
                userId,
                investimentName: formData.investimentName!,
                amount: formData.amount!,
                investmentTypeId: formData.investmentTypeId!,
                investmentGoalId: formData.investmentGoalId ?? null,
                notes: formData.notes || null,
              } as any)
            }
            onClose()
          }}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>
                Nome do Investimento
              </label>
              <input
                type="text"
                value={formData.investimentName || ''}
                onChange={e =>
                  setFormData({ ...formData, investimentName: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>Valor</label>
              <input
                type="number"
                value={formData.amount ?? 0}
                onChange={e =>
                  setFormData({
                    ...formData,
                    amount: Number(e.target.value),
                  })
                }
                className="w-full p-2 border rounded"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>Tipo</label>
              <input
                type="text"
                value={formData.investmentTypeId || ''}
                onChange={e =>
                  setFormData({ ...formData, investmentTypeId: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={onClose} type="button">
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </div>
    </div>
  )
}