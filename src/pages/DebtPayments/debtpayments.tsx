import { useEffect, useState } from 'react'
import DebtPaymentModal from '@/components/debtpayments/DebtPaymentModal'
import DebtPaymentsList from '@/components/debtpayments/DebtPaymentsList'
import { Button } from '@/components/ui/button'
import { Title } from '@/components/ui/title'
import { useApi } from '@/hooks/useApi'
import { debtPaymentsService } from '@/lib/apiServices'
import { MainLayout } from '@/components/layout/mainLayout'

const DebtPaymentsPage = () => {
  const { execute } = useApi()
  const [payments, setPayments] = useState<any[]>([])
  const [showModal, setShowModal] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<any>(null)

  useEffect(() => {
    loadPayments()
  }, [])

  const loadPayments = async () => {
    try {
      const response = await execute(() => debtPaymentsService.getAll())
      if (response?.data) {
        setPayments(Array.isArray(response.data) ? response.data : [])
      }
    } catch (error) {
      console.error('Erro ao carregar pagamentos de dívidas:', error)
    }
  }

  const handleOpenModal = (payment?: any) => {
    setSelectedPayment(payment || null)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedPayment(null)
  }

  const handleSuccess = () => {
    loadPayments()
    handleCloseModal()
  }

  return (
    <MainLayout>
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Title>Pagamentos de Dívidas</Title>
          <p className="text-gray-600">
            Histórico e gerenciamento de pagamentos
          </p>
        </div>
        <Button onClick={() => handleOpenModal()}>Novo Pagamento</Button>
      </div>

      <DebtPaymentsList
        payments={payments}
        onEdit={handleOpenModal}
        onDelete={loadPayments}
      />

      {showModal && (
        <DebtPaymentModal
          payment={selectedPayment}
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
        />
      )}
      </div>
    </MainLayout>
  )
}

export default DebtPaymentsPage
