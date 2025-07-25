import type React from 'react'
import { useState } from 'react'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { TopNavigation } from '../../components/TopNavigation'
import { mockCategories, TransactionType } from '../../mocks/mockData'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

interface Category {
  id: number
  categoryName: string
  categoryType: TransactionType
  icon: string
  color: string
  parentId?: number
  order: number
}

const COMMON_ICONS = ['💰', '🏠', '🍽️', '🚗', '🛒', '🏥', '🎮', '✈️', '📚', '🎁', '💼', '🎯']

export function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>(
    mockCategories.map((cat, index) => ({ ...cat, order: index }))
  )
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

  const handleDeleteCategory = (categoryId: number) => {
    // Remove a categoria e suas subcategorias
    setCategories(categories.filter(c => c.id !== categoryId && c.parentId !== categoryId))
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(categories)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Atualiza a ordem das categorias
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index
    }))

    setCategories(updatedItems)
  }

  const getSubcategories = (parentId: number) => {
    return categories
      .filter(c => c.parentId === parentId)
      .sort((a, b) => a.order - b.order)
  }

  const getMainCategories = () => {
    return categories
      .filter(c => !c.parentId)
      .sort((a, b) => a.order - b.order)
  }

  return (
    <div className="p-4">
      <TopNavigation />

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Categorias
          </h2>
          <Button onClick={handleAddCategory} className="flex items-center gap-2">
            Nova Categoria
          </Button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="categories">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                {getMainCategories().map((category, index) => (
                  <Draggable
                    key={category.id}
                    draggableId={category.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Card>
                          <div className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{category.icon}</span>
                                <div>
                                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                                    {category.categoryName}
                                  </h3>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {category.categoryType === TransactionType.RECEITA ? 'Receita' : 
                                     category.categoryType === TransactionType.DESPESA ? 'Despesa' : 'Investimento'}
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

                            {/* Subcategorias */}
                            {getSubcategories(category.id).length > 0 && (
                              <div className="mt-4 pl-8 space-y-2">
                                {getSubcategories(category.id).map(subcategory => (
                                  <div
                                    key={subcategory.id}
                                    className="flex items-center justify-between p-2 bg-gray-50 rounded"
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="text-xl">{subcategory.icon}</span>
                                      <span className="text-sm">{subcategory.categoryName}</span>
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
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {isModalOpen && (
        <CategoryModal
          category={selectedCategory}
          categories={categories}
          onClose={() => setIsModalOpen(false)}
          onSave={category => {
            if (selectedCategory) {
              setCategories(categories.map(c => 
                c.id === selectedCategory.id ? { ...category, id: c.id } as Category : c
              ))
            } else {
              setCategories([...categories, { ...category, id: Date.now(), order: categories.length } as Category])
            }
            setIsModalOpen(false)
          }}
        />
      )}
    </div>
  )
}

interface CategoryModalProps {
  category: Category | null
  categories: Category[]
  onClose: () => void
  onSave: (category: Partial<Category>) => void
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  category,
  categories,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<Category>>(
    category || {
      categoryName: '',
      categoryType: TransactionType.DESPESA,
      icon: '',
      color: '#000000',
      parentId: undefined,
    }
  )
  const [showIconPicker, setShowIconPicker] = useState(false)

  const mainCategories = categories.filter(c => !c.parentId)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">
          {category ? 'Editar Categoria' : 'Nova Categoria'}
        </h3>

        <form
          onSubmit={e => {
            e.preventDefault()
            onSave(formData)
          }}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Nome da Categoria
              </label>
              <input
                type="text"
                value={formData.categoryName}
                onChange={e =>
                  setFormData({ ...formData, categoryName: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tipo</label>
              <select
                value={formData.categoryType}
                onChange={e =>
                  setFormData({
                    ...formData,
                    categoryType: e.target.value as TransactionType,
                  })
                }
                className="w-full p-2 border rounded"
              >
                <option value="RECEITA">Receita</option>
                <option value="DESPESA">Despesa</option>
                <option value="INVESTIMENTO">Investimento</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Ícone
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowIconPicker(!showIconPicker)}
                  className="w-full p-2 border rounded flex items-center justify-between"
                >
                  <span className="text-2xl">{formData.icon || 'Selecione um ícone'}</span>
                  <span>▼</span>
                </button>
                {showIconPicker && (
                  <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow-lg p-2 grid grid-cols-6 gap-2">
                    {COMMON_ICONS.map(icon => (
                      <button
                        key={icon}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, icon })
                          setShowIconPicker(false)
                        }}
                        className="p-2 hover:bg-gray-100 rounded text-2xl"
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Cor</label>
              <input
                type="color"
                value={formData.color}
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