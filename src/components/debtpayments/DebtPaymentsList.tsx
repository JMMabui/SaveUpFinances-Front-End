import dayjs from 'dayjs'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useApi } from '@/hooks/useApi'
import { debtPaymentsService } from '@/lib/apiServices'

interface DebtPaymentsListProps {
  payments: any[]
  onEdit: (payment: any) => void
  onDelete: () => void
}

const DebtPaymentsList = ({
  payments,
  onEdit,
  onDelete,
}: DebtPaymentsListProps) => {
  const { execute } = useApi()

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este pagamento?')) {
      try {
        await execute(() => debtPaymentsService.delete(id))
        onDelete()
      } catch (_error) {
        alert('Erro ao excluir pagamento')
      }
    }
  }

  if (payments.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-gray-600">Nenhum pagamento de dívida cadastrado</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {payments.map(payment => (
        <Card key={payment.id} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold">Pagamento de Dívida</h3>
              <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                <div>
                  <p className="text-gray-600">Valor</p>
                  <p className="font-semibold">
                    {(payment.amount || 0).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'MZN',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Data</p>
                  <p className="font-semibold">
                    {dayjs(payment.date).format('DD/MM/YYYY')}
                  </p>
                </div>
              </div>
              {payment.notes && (
                <p className="text-sm text-gray-600 mt-2">{payment.notes}</p>
              )}
            </div>
            <div className="flex gap-2 ml-4">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(payment)}
              >
                Editar
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-red-600"
                onClick={() => handleDelete(payment.id)}
              >
                Excluir
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default DebtPaymentsList
