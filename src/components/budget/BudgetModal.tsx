import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { COLORS } from '@/constants/colors'

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

export function BudgetModal({
  selectedBudget,
  categories,
  onClose,
  onSubmit,
}: BudgetModalProps) {
  const { register, handleSubmit, reset } = useForm<BudgetFormState>({
    defaultValues: {
      categoryId: '',
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      limit: 0,
    },
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
    <Sheet
      open
      onOpenChange={open => {
        if (!open) onClose()
      }}
    >
      <SheetContent side="right" className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle style={{ color: COLORS.black[800] }}>
            {selectedBudget?.id ? 'Editar Orçamento' : 'Novo Orçamento'}
          </SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-4">
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: COLORS.black[700] }}
            >
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

            <label
              className="block text-sm font-medium mt-4 mb-1"
              style={{ color: COLORS.black[700] }}
            >
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

            <label
              className="block text-sm font-medium mt-4 mb-1"
              style={{ color: COLORS.black[700] }}
            >
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

            <label
              className="block text-sm font-medium mt-4 mb-1"
              style={{ color: COLORS.black[700] }}
            >
              Limite
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              placeholder="Defina o limite do orçamento"
              {...register('limit', { required: true, valueAsNumber: true })}
            />
          </div>

          <SheetFooter className="px-4 mt-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="ml-2">
              {selectedBudget?.id ? 'Salvar' : 'Criar Orçamento'}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
