import type React from 'react'
import { useMemo, useState } from 'react'
import { Button } from '../../components/Button'
import { Card } from '@/components/ui/card'
import { Header } from '@/components/Header'
import { useGetCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from '@/HTTP/categories'
import { COLORS } from '@/constants/colors'

interface Category {
  id: string
  categoryName: string
  categoryType: 'income' | 'expense' | 'investment'
  icon: string | null
  color: string | null
  parentId?: string | null
  order?: number
}

const COMMON_ICONS = ['💰', '🏠', '🍽️', '🚗', '🛒', '🏥', '🎮', '✈️', '📚', '🎁', '💼', '🎯']

export function CategoryManagement() {
  const { data } = useGetCategories()
  const categoriesData: Category[] = data?.data || []

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  const handleAddCategory = () => {
    setSelectedCategory(null)
    setIsModalOpen(true)
  }

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category)
    setIsModalOpen(true)
  }

  const deleteCategory = useDeleteCategory()

  const handleDeleteCategory = (categoryId: string) => {
    deleteCategory.mutate(categoryId)
  }

  const getSubcategories = (parentId: string) => {
    return categoriesData
      .filter(c => c.parentId === parentId)
  }

  const getMainCategories = () => {
    return categoriesData
      .filter(c => !c.parentId)
  }

  return (
    <div className="p-4">
      <Header />

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold" style={{ color: COLORS.black[800] }}>
            Categorias
          </h2>
          <Button onClick={handleAddCategory} className="flex items-center gap-2">
            Nova Categoria
          </Button>
        </div>

        <div className="space-y-4">
          {getMainCategories().map((category) => (
            <Card key={category.id} className="border" style={{ borderColor: COLORS.blue[100] }}>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon || '📁'}</span>
                    <div>
                      <h3 className="font-medium" style={{ color: COLORS.black[800] }}>
                        {category.categoryName}
                      </h3>
                      <p className="text-sm" style={{ color: COLORS.black[500] }}>
                        {category.categoryType === 'income' ? 'Receita' : 
                         category.categoryType === 'expense' ? 'Despesa' : 'Investimento'}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleEditCategory(category)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      Excluir
                    </Button>
                  </div>
                </div>

                {getSubcategories(category.id).length > 0 && (
                  <div className="mt-4 pl-8 space-y-2">
                    {getSubcategories(category.id).map(subcategory => (
                      <div
                        key={subcategory.id}
                        className="flex items-center justify-between p-2 rounded"
                        style={{ backgroundColor: COLORS.black[50] }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{subcategory.icon || '📁'}</span>
                          <span className="text-sm" style={{ color: COLORS.black[700] }}>{subcategory.categoryName}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="secondary"
                            size="xs"
                            onClick={() => handleEditCategory(subcategory)}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="danger"
                            size="xs"
                            onClick={() => handleDeleteCategory(subcategory.id)}
                          >
                            Excluir
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <CategoryModal
          category={selectedCategory}
          categories={categoriesData}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}

interface CategoryModalProps {
  category: Category | null
  categories: Category[]
  onClose: () => void
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  category,
  categories,
  onClose,
}) => {
  const [formData, setFormData] = useState<Partial<Category>>(
    category || {
      categoryName: '',
      categoryType: 'expense',
      icon: '',
      color: '#000000',
      parentId: undefined,
    }
  )

  const mainCategories = categories.filter(c => !c.parentId)

  const createCategory = useCreateCategory()
  const updateCategory = useUpdateCategory(category?.id || '')

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-4" style={{ color: COLORS.black[800] }}>
          {category ? 'Editar Categoria' : 'Nova Categoria'}
        </h3>

        <form
          onSubmit={e => {
            e.preventDefault()
            if (category) {
              updateCategory.mutate({
                categoryName: formData.categoryName!,
                categoryType: formData.categoryType!,
                icon: formData.icon || null,
                color: formData.color || null,
              } as any)
            } else {
              createCategory.mutate({
                categoryName: formData.categoryName!,
                categoryType: formData.categoryType!,
                icon: formData.icon || null,
                color: formData.color || null,
              } as any)
            }
            onClose()
          }}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>
                Nome da Categoria
              </label>
              <input
                type="text"
                value={formData.categoryName || ''}
                onChange={e =>
                  setFormData({ ...formData, categoryName: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>Tipo</label>
              <select
                value={formData.categoryType}
                onChange={e =>
                  setFormData({
                    ...formData,
                    categoryType: e.target.value as Category['categoryType'],
                  })
                }
                className="w-full p-2 border rounded"
              >
                <option value="income">Receita</option>
                <option value="expense">Despesa</option>
                <option value="investment">Investimento</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>
                Categoria Pai
              </label>
              <select
                value={formData.parentId || ''}
                onChange={e =>
                  setFormData({
                    ...formData,
                    parentId: e.target.value || undefined,
                  })
                }
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

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>
                Ícone
              </label>
              <div className="relative">
                <button
                  type="button"
                  className="w-full p-2 border rounded flex items-center justify-between"
                >
                  <span className="text-2xl">{formData.icon || 'Selecione um ícone'}</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>Cor</label>
              <input
                type="color"
                value={(formData.color as string) || '#000000'}
                onChange={e =>
                  setFormData({ ...formData, color: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </div>
    </div>
  )
} 