import type React from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
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
  const { register, handleSubmit, reset } = useForm<Category>({
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
        <h3 className="text-xl font-bold mb-4" style={{ color: COLORS.black[800] }}>
          {category ? 'Editar Categoria' : 'Nova Categoria'}
        </h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>
                Nome da Categoria
              </label>
              <input
                type="text"
                {...register('categoryName', { required: true })}
                className="w-full p-2 border rounded"
                placeholder="Ex: Alimentação"
              />
            </div>

            {/* Tipo */}
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>Tipo</label>
              <select
                {...register('categoryType', { required: true })}
                className="w-full p-2 border rounded"
              >
                <option value="income">Receita</option>
                <option value="expense">Despesa</option>
                <option value="investment">Investimento</option>
              </select>
            </div>

            {/* Categoria Pai */}
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>
                Categoria Pai
              </label>
              <select
                {...register('parentId')}
                className="w-full p-2 border rounded"
              >
                <option value="">Nenhuma (Categoria Principal)</option>
                {mainCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
            </div>

            {/* Ícone */}
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>
                Ícone
              </label>
              <input
                type="text"
                {...register('icon')}
                className="w-full p-2 border rounded"
                placeholder="Ex: 🍔"
              />
            </div>

            {/* Cor */}
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>Cor</label>
              <input
                type="color"
                {...register('color')}
                className="w-full p-2 border rounded"
              />
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