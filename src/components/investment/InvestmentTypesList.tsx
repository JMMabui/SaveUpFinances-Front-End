import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useApi } from '@/hooks/useApi'
import { investmentTypesService } from '@/lib/apiServices'

interface InvestmentTypesListProps {
  types: any[]
  onEdit: (type: any) => void
  onDelete: () => void
}

const InvestmentTypesList = ({
  types,
  onEdit,
  onDelete,
}: InvestmentTypesListProps) => {
  const { request } = useApi()

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este tipo?')) {
      try {
        await request(() => investmentTypesService.delete(id))
        onDelete()
      } catch (_error) {
        alert('Erro ao excluir tipo')
      }
    }
  }

  if (types.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-gray-600">Nenhum tipo de investimento cadastrado</p>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {types.map(type => (
        <Card key={type.id} className="p-4">
          <div className="flex items-start gap-3 mb-4">
            {type.icon && <span className="text-2xl">{type.icon}</span>}
            <div className="flex-1">
              <h3 className="font-semibold">{type.categoryName}</h3>
              <p className="text-xs text-gray-600">Tipo: {type.categoryType}</p>
            </div>
            {type.color && (
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: type.color }}
              />
            )}
          </div>

          <div className="flex gap-2 pt-4 border-t">
            <Button
              size="sm"
              variant="outline"
              className="flex-1"
              onClick={() => onEdit(type)}
            >
              Editar
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-red-600 flex-1"
              onClick={() => handleDelete(type.id)}
            >
              Excluir
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default InvestmentTypesList
