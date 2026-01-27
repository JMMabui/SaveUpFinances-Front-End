import { useEffect, useState } from 'react'
import BankModal from '@/components/banks/BankModal'
import BanksList from '@/components/banks/BanksList'
import { Button } from '@/components/ui/button'
import { Title } from '@/components/ui/title'
import { useApi } from '@/hooks/useApi'
import { banksService } from '@/lib/apiServices'
import { MainLayout } from '@/components/layout/mainLayout'

const BanksPage = () => {
  const { execute } = useApi()
  const [banks, setBanks] = useState<any[]>([])
  const [showModal, setShowModal] = useState(false)
  const [selectedBank, setSelectedBank] = useState<any>(null)

  useEffect(() => {
    loadBanks()
  }, [])

  const loadBanks = async () => {
    try {
      const response = await execute(() => banksService.getAll())
      if (response?.data) {
        setBanks(Array.isArray(response.data) ? response.data : [])
      }
    } catch (error) {
      console.error('Erro ao carregar bancos:', error)
    }
  }

  const handleOpenModal = (bank?: any) => {
    setSelectedBank(bank || null)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedBank(null)
  }

  const handleSuccess = () => {
    loadBanks()
    handleCloseModal()
  }

  return (
    <MainLayout>
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Title>Bancos</Title>
          <p className="text-gray-600">Gerencie as instituições bancárias</p>
        </div>
        <Button onClick={() => handleOpenModal()}>Adicionar Banco</Button>
      </div>

      <BanksList banks={banks} onEdit={handleOpenModal} onDelete={loadBanks} />

      {showModal && (
        <BankModal
          bank={selectedBank}
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
        />
      )}
      </div>
    </MainLayout>
  )
}

export default BanksPage
