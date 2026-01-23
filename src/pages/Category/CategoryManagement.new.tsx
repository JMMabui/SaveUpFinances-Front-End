import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
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

enum TransactionType {
  RECEITA = 'RECEITA',
  DESPESA = 'DESPESA',
  INVESTIMENTO = 'INVESTIMENTO',
}

interface Category {
  id: number
  categoryName: string
  categoryType: TransactionType
  icon: string
  color: string
  parentId?: number
  order: number
}

const COMMON_ICONS = [
  '💰',
  '🏠',
  '🍽️',
  '🚗',
  '🛒',
  '🏥',
  '🎮',
  '✈️',
  '📚',
  '🎁',
  '💼',
  '🎯',
]

export function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  )

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
    setCategories(
      categories.filter(c => c.id !== categoryId && c.parentId !== categoryId)
    )
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(categories)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Atualiza a ordem das categorias
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index,
    }))

    setCategories(updatedItems)
  }

  const getSubcategories = (parentId: number) => {
    return categories
      .filter(c => c.parentId === parentId)
      .sort((a, b) => a.order - b.order)
  }

  const getMainCategories = () => {
    return categories.filter(c => !c.parentId).sort((a, b) => a.order - b.order)
  }

  return (
    <div className="p-4">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Categorias
          </h2>
          <Button
            onClick={handleAddCategory}
            className="flex items-center gap-2"
          >
            Nova Categoria
          </Button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="categories">
            {provided => (
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
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Card>
                          <div className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">
                                  {category.icon}
                                </span>
                                <div>
                                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                                    {category.categoryName}
                                  </h3>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {category.categoryType ===
                                    TransactionType.RECEITA
                                      ? 'Receita'
                                      : category.categoryType ===
                                          TransactionType.DESPESA
                                        ? 'Despesa'
                                        : 'Investimento'}
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
                                  onClick={() =>
                                    handleDeleteCategory(category.id)
                                  }
                                >
                                  Excluir
                                </Button>
                              </div>
                            </div>

                            {/* Subcategorias */}
                            {getSubcategories(category.id).length > 0 && (
                              <div className="mt-4 pl-8 space-y-2">
                                {getSubcategories(category.id).map(
                                  subcategory => (
                                    <div
                                      key={subcategory.id}
                                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                                    >
                                      <div className="flex items-center gap-2">
                                        <span className="text-xl">
                                          {subcategory.icon}
                                        </span>
                                        <span className="text-sm">
                                          {subcategory.categoryName}
                                        </span>
                                      </div>
                                      <div className="flex gap-2">
                                        <Button
                                          variant="secondary"
                                          size="sm"
                                          onClick={() =>
                                            handleEditCategory(subcategory)
                                          }
                                        >
                                          Editar
                                        </Button>
                                        <Button
                                          variant="danger"
                                          size="sm"
                                          onClick={() =>
                                            handleDeleteCategory(subcategory.id)
                                          }
                                        >
                                          Excluir
                                        </Button>
                                      </div>
                                    </div>
                                  )
                                )}
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
          onClose={() => setIsModalOpen(false)}
          onSave={category => {
            if (selectedCategory) {
              setCategories(
                categories.map(c =>
                  c.id === selectedCategory.id
                    ? ({ ...category, id: c.id } as Category)
                    : c
                )
              )
            } else {
              setCategories([
                ...categories,
                {
                  ...category,
                  id: Date.now(),
                  order: categories.length,
                } as Category,
              ])
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
  onClose: () => void
  onSave: (category: Partial<Category>) => void
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  category,
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

  // removed unused variable

  return (
    <Sheet
      open
      onOpenChange={open => {
        if (!open) onClose()
      }}
    >
      <SheetContent side="right" className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>
            {category ? 'Editar Categoria' : 'Nova Categoria'}
          </SheetTitle>
        </SheetHeader>
        <form
          onSubmit={e => {
            e.preventDefault()
            onSave(formData)
          }}
        >
          <div className="space-y-4 px-4">
            <div>
              <Input
                label="Nome da Categoria"
                value={formData.categoryName}
                onChange={e =>
                  setFormData({ ...formData, categoryName: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tipo</label>
              <Select
                value={formData.categoryType}
                onValueChange={value =>
                  setFormData({
                    ...formData,
                    categoryType: value as TransactionType,
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TransactionType.RECEITA}>
                    Receita
                  </SelectItem>
                  <SelectItem value={TransactionType.DESPESA}>
                    Despesa
                  </SelectItem>
                  <SelectItem value={TransactionType.INVESTIMENTO}>
                    Investimento
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Ícone</label>
              <div className="relative">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowIconPicker(!showIconPicker)}
                  className="w-full justify-between"
                >
                  <span className="text-2xl">
                    {formData.icon || 'Selecione um ícone'}
                  </span>
                </Button>
                {showIconPicker && (
                  <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow-lg p-2 grid grid-cols-6 gap-2">
                    {COMMON_ICONS.map(icon => (
                      <Button
                        key={icon}
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          setFormData({ ...formData, icon })
                          setShowIconPicker(false)
                        }}
                        className="p-2 text-2xl"
                      >
                        {icon}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <Input
                label="Cor"
                type="color"
                value={formData.color}
                onChange={e =>
                  setFormData({ ...formData, color: e.target.value })
                }
              />
            </div>
          </div>

          <SheetFooter className="px-4 mt-6">
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
