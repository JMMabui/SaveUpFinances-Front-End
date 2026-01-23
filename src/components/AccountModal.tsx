import type React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

interface AccountModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: {
    label: string
    type: string
    initialBalance: number
  }) => void
}

export function AccountModal({ isOpen, onClose, onSave }: AccountModalProps) {
  const [formData, setFormData] = useState({
    label: '',
    type: 'ordem',
    initialBalance: 0,
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'initialBalance' ? Number.parseFloat(value) || 0 : value,
    }))
  }

  return (
    <Sheet
      open={isOpen}
      onOpenChange={open => {
        if (!open) onClose()
      }}
    >
      <SheetContent side="right" className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Adicionar Nova Conta</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label
              htmlFor="label"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Nome da Conta
            </label>
            <input
              type="text"
              id="label"
              name="label"
              value={formData.label}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Tipo de Conta
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="ordem">Conta à ordem</option>
              <option value="poupanca">Conta poupança</option>
              <option value="carteira">Carteira móvel</option>
              <option value="salario">Conta salário</option>
              <option value="investimento">Conta investimento</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="initialBalance"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Saldo Inicial
            </label>
            <input
              type="number"
              id="initialBalance"
              name="initialBalance"
              value={formData.initialBalance}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <SheetFooter className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Adicionar</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
