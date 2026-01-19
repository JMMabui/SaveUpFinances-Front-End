import type React from 'react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { COLORS } from '@/constants/colors'
import { useCreateCategory, useUpdateCategory } from '@/lib/HTTP/categories'

interface Category {
  id: string
  categoryName: string
  categoryType: 'income' | 'expense' | 'investment'
  icon: string | null
  color: string | null
  parentId?: string | null
  order?: number
}

interface CategoryModalProps {
  category: Category | null
  categories: Category[]
  onClose: () => void
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
  category,
  categories,
  onClose,
}) => {
  const { register, handleSubmit, reset, control } = useForm<Category>({
    defaultValues: {
      categoryName: '',
      categoryType: 'expense',
      icon: '',
      color: '#000000',
      parentId: undefined,
    },
  })

  const mainCategories = categories.filter(c => !c.parentId)

  const createCategory = useCreateCategory()
  const updateCategory = useUpdateCategory(category?.id || '')

  // Atualiza valores ao abrir modal
  useEffect(() => {
    if (category) {
      reset(category)
    } else {
      reset({
        categoryName: '',
        categoryType: 'expense',
        icon: '',
        color: '#000000',
        parentId: undefined,
      })
    }
  }, [category, reset])

  const onSubmit = (data: Category) => {
    if (category) {
      updateCategory.mutate({
        ...data,
        id: category.id,
        icon: data.icon || null,
        color: data.color || null,
      } as any)
    } else {
      createCategory.mutate({
        ...data,
        icon: data.icon || null,
        color: data.color || null,
      } as any)
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3
          className="text-xl font-bold mb-4"
          style={{ color: COLORS.black[800] }}
        >
          {category ? 'Editar Categoria' : 'Nova Categoria'}
        </h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* Nome */}
            <div>
              <Input
                label="Nome da Categoria"
                {...register('categoryName', { required: true })}
                placeholder="Ex: Alimentação"
              />
            </div>

            {/* Tipo */}
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>
                Tipo
              </label>
              <Controller
                name="categoryType"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Receita</SelectItem>
                      <SelectItem value="expense">Despesa</SelectItem>
                      <SelectItem value="investment">Investimento</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Categoria Pai */}
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>
                Categoria Pai
              </label>
              <Controller
                name="parentId"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ?? ''}
                    onValueChange={value => field.onChange(value || undefined)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Nenhuma (Categoria Principal)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Nenhuma (Categoria Principal)</SelectItem>
                      {mainCategories.map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.categoryName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Ícone */}
            <div>
              <Input
                label="Ícone"
                type="text"
                {...register('icon')}
                placeholder="Ex: 🍔"
              />
            </div>

            {/* Cor */}
            <div>
              <Input label="Cor" type="color" {...register('color')} />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
