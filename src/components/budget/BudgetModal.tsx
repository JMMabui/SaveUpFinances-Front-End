import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { COLORS } from '@/constants/colors'
import { useCreateBudget, useUpdateBudget } from '@/lib/HTTP/budget'

interface BudgetFormState {
  id?: string
  categoryId: string
  month: number
  year: number
  limit: number
}

interface BudgetModalProps {
  selectedBudget: BudgetFormState | null
  categories: any[]
  onClose: () => void
  onSubmit: (data: BudgetFormState) => void
}

export function BudgetModal({ selectedBudget, categories, onClose, onSubmit }: BudgetModalProps) {
  const { register, handleSubmit, reset } = useForm<BudgetFormState>({
    defaultValues: {
      categoryId: '',
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      limit: 0,
    }
  })

  // Quando abrir o modal, atualiza os valores
  useEffect(() => {
    if (selectedBudget) {
      reset(selectedBudget)
    } else {
      reset({
        categoryId: '',
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        limit: 0,
      })
    }
  }, [selectedBudget, reset])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4" style={{ color: COLORS.black[800] }}>
          {selectedBudget?.id ? 'Editar Orçamento' : 'Novo Orçamento'}
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>
            Categoria
          </label>
          <select
            className="w-full p-2 border rounded"
            {...register('categoryId', { required: true })}
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((category: any) => (
              <option key={category.id} value={category.id}>
                {category.categoryName}
              </option>
            ))}
          </select>

          <label className="block text-sm font-medium mt-4 mb-1" style={{ color: COLORS.black[700] }}>
            Mês
          </label>
          <select
            className="w-full p-2 border rounded"
            {...register('month', { required: true, valueAsNumber: true })}
          >
            <option value="">Selecione um mês</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i + 1}>
                {new Date(0, i).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>

          <label className="block text-sm font-medium mt-4 mb-1" style={{ color: COLORS.black[700] }}>
            Ano
          </label>
          <select
            className="w-full p-2 border rounded"
            {...register('year', { required: true, valueAsNumber: true })}
          >
            <option value="">Selecione um ano</option>
            {Array.from({ length: 11 }, (_, i) => (
              <option key={i} value={2020 + i}>
                {2020 + i}
              </option>
            ))}
          </select>

          <label className="block text-sm font-medium mt-4 mb-1" style={{ color: COLORS.black[700] }}>
            Limite
          </label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            placeholder="Defina o limite do orçamento"
            {...register('limit', { required: true, valueAsNumber: true })}
          />

          <div className="mt-6 flex justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button type="submit" className="ml-2">
              {selectedBudget?.id ? 'Salvar' : 'Criar Orçamento'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}