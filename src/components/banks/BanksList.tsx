import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useApi } from '@/hooks/useApi'
import { banksService } from '@/lib/apiServices'

interface BanksListProps {
  banks: any[]
  onEdit: (bank: any) => void
  onDelete: () => void
}

const BanksList = ({ banks, onEdit, onDelete }: BanksListProps) => {
  const { request } = useApi()

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este banco?')) {
      try {
        await request(() => banksService.delete(id))
        onDelete()
      } catch (_error) {
        alert('Erro ao excluir banco')
      }
    }
  }

  if (banks.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-gray-600">Nenhum banco cadastrado</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {banks.map(bank => (
        <Card key={bank.id} className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {bank.logoUrl && (
              <img
                src={bank.logoUrl}
                alt={bank.bankName}
                className="w-12 h-12 object-contain"
              />
            )}
            <div>
              <h3 className="font-semibold">{bank.bankName}</h3>
              <p className="text-sm text-gray-600">{bank.id}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => onEdit(bank)}>
              Editar
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-red-600"
              onClick={() => handleDelete(bank.id)}
            >
              Excluir
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default BanksList
