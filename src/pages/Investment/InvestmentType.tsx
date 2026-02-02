import { useEffect, useState } from 'react'
import InvestmentTypeModal from '@/components/investment/InvestmentTypeModal'
import InvestmentTypesList from '@/components/investment/InvestmentTypesList'
import { MainLayout } from '@/components/layout/mainLayout'
import { Button } from '@/components/ui/button'
import { Title } from '@/components/ui/title'
import { useApi } from '@/hooks/useApi'
import { investmentTypesService } from '@/lib/apiServices'

const InvestmentTypesPage = () => {
  const { execute } = useApi()
  const [types, setTypes] = useState<any[]>([])
  const [showModal, setShowModal] = useState(false)
  const [selectedType, setSelectedType] = useState<any>(null)

  useEffect(() => {
    loadTypes()
  }, [])

  const loadTypes = async () => {
    try {
      const response = await execute(() => investmentTypesService.getAll())
      if (response?.data) {
        setTypes(Array.isArray(response.data) ? response.data : [])
      }
    } catch (error) {
      console.error('Erro ao carregar tipos de investimento:', error)
    }
  }

  const handleOpenModal = (type?: any) => {
    setSelectedType(type || null)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedType(null)
  }

  const handleSuccess = () => {
    loadTypes()
    handleCloseModal()
  }

  return (
    <MainLayout>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <Title>Tipos de Investimento</Title>
            <p className="text-gray-600">
              Categorias de investimento disponíveis
            </p>
          </div>
          <Button onClick={() => handleOpenModal()}>Novo Tipo</Button>
        </div>

        <InvestmentTypesList
          types={types}
          onEdit={handleOpenModal}
          onDelete={loadTypes}
        />

        {showModal && (
          <InvestmentTypeModal
            type={selectedType}
            onClose={handleCloseModal}
            onSuccess={handleSuccess}
          />
        )}
      </div>
    </MainLayout>
  )
}

export default InvestmentTypesPage
