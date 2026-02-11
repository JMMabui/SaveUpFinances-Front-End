import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useApi } from '@/hooks/useApi'
import { investmentTypesService } from '@/lib/apiServices'

interface InvestmentTypeModalProps {
  type: any | null
  onClose: () => void
  onSuccess: () => void
}

const InvestmentTypeModal = ({
  type,
  onClose,
  onSuccess,
}: InvestmentTypeModalProps) => {
  const { execute, loading } = useApi()
  const [formData, setFormData] = useState({
    categoryName: '',
    categoryType: 'investment',
    icon: '',
    color: '#0088FE',
  })

  useEffect(() => {
    if (type) {
      setFormData({
        categoryName: type.categoryName || '',
        categoryType: type.categoryType || 'investment',
        icon: type.icon || '',
        color: type.color || '#0088FE',
      })
    }
  }, [type])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (type?.id) {
        await execute(() => investmentTypesService.update(type.id, formData))
      } else {
        await execute(() => investmentTypesService.create(formData))
      }
      onSuccess()
    } catch (_error) {
      alert('Erro ao salvar tipo de investimento')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <Card className="p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {type ? 'Editar Tipo' : 'Novo Tipo de Investimento'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome</label>
            <Input
              type="text"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              placeholder="Ex: Ações, Títulos, etc"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Ícone (emoji)
            </label>
            <Input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              placeholder="📈"
              maxLength={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Cor</label>
            <div className="flex gap-2">
              <Input
                type="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
              />
              <span className="text-sm text-gray-600 flex items-center">
                {formData.color}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default InvestmentTypeModal
