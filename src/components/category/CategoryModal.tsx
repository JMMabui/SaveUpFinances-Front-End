import type React from 'react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import type { z } from 'zod'
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
import { useCreateCategory, useUpdateCategory } from '@/lib/HTTP/categories'
import type { CategoriesCreateBodySchema } from '@/lib/openapi/zod/Categories'

interface Category {
  id?: string
  categoryName: string
  categoryType: z.infer<typeof CategoriesCreateBodySchema>['categoryType']
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
  const updateCategory = useUpdateCategory()

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
    <Sheet
      open
      onOpenChange={open => {
        if (!open) onClose()
      }}
    >
      <SheetContent side="right" className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle style={{ color: COLORS.black[800] }}>
            {category ? 'Editar Categoria' : 'Nova Categoria'}
          </SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 px-4">
            <div>
              <Input
                label="Nome da Categoria"
                {...register('categoryName', { required: true })}
                placeholder="Ex: Alimentação"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: COLORS.black[700] }}
              >
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

            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: COLORS.black[700] }}
              >
                Categoria Pai
              </label>
              <Controller
                name="parentId"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ?? 'none'}
                    onValueChange={value =>
                      field.onChange(value === 'none' ? undefined : value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Nenhuma (Categoria Principal)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">
                        Nenhuma (Categoria Principal)
                      </SelectItem>
                      {mainCategories.map(cat => (
                        <SelectItem key={cat.id} value={cat.id ?? ''}>
                          {cat.categoryName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div>
              <Input
                label="Ícone"
                type="text"
                {...register('icon')}
                placeholder="Ex: 🍔"
              />
            </div>

            <div>
              <Input label="Cor" type="color" {...register('color')} />
            </div>
          </div>

          <SheetFooter className="px-4">
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
