import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { COLORS } from '@/constants/colors'
import { useGetCategories } from '@/lib/HTTP/categories'
import { useCreateExpense, useUpdateExpense } from '@/lib/HTTP/expenses'

interface Expense {
  id: string
  date: string
  description: string
  amount: number
  categoryId: string
}

interface ExpenseModalProps {
  expense: Expense | null
  onClose: () => void
}

export function ExpenseModal({ expense, onClose }: ExpenseModalProps) {
  const [formData, setFormData] = useState<Partial<Expense>>(
    expense || {
      date: new Date().toISOString().slice(0, 10),
      description: '',
      amount: 0,
      categoryId: '',
    }
  )

  const { data: categoriesQuery } = useGetCategories()
  const categories = categoriesQuery?.data || []

  const createExpense = useCreateExpense()
  const updateExpense = useUpdateExpense(expense?.id || '')

  useEffect(() => {
    if (expense) setFormData(expense)
  }, [expense])


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
            {expense ? 'Editar Despesa' : 'Nova Despesa'}
          </SheetTitle>
        </SheetHeader>

        <form
          onSubmit={e => {
            e.preventDefault()
            if (expense) {
              updateExpense.mutate({
                date: formData.date!,
                description: formData.description!,
                amount: Number(formData.amount || 0),
                categoryId: formData.categoryId!,
              })
            } else {
              createExpense.mutate({
                date: formData.date!,
                description: formData.description!,
                amount: Number(formData.amount || 0),
                categoryId: formData.categoryId!,
                userId:
                  typeof window !== 'undefined'
                    ? localStorage.getItem('userId') || ''
                    : '',
              } as any)
            }
            onClose()
          }}
        >
          <div className="space-y-4 px-4">
            <div>
              <Input
                label="Data"
                type="date"
                value={formData.date || ''}
                onChange={e =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Input
                label="Descrição"
                value={formData.description || ''}
                onChange={e =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Input
                label="Valor"
                type="number"
                value={String(formData.amount ?? 0)}
                onChange={e =>
                  setFormData({ ...formData, amount: Number(e.target.value) })
                }
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: COLORS.black[700] }}
              >
                Categoria
              </label>
              <Select
                value={formData.categoryId || ''}
                onValueChange={v => setFormData({ ...formData, categoryId: v })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c: any) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.categoryName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <SheetFooter className="px-4 mt-6">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
