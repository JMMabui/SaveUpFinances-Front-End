import type React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MainLayout } from '@/components/layout/mainLayout'
import { useGetCategories, useDeleteCategory } from '@/lib/HTTP/categories'
import { COLORS } from '@/constants/colors'
import { CategoryModal } from '@/components/category/CategoryModal'

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
    <MainLayout>
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
    </MainLayout>
  )
}