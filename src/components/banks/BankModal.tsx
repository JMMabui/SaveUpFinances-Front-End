import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useApi } from '@/hooks/useApi'
import { banksService } from '@/lib/apiServices'

interface BankModalProps {
  bank: any | null
  onClose: () => void
  onSuccess: () => void
}

const BankModal = ({ bank, onClose, onSuccess }: BankModalProps) => {
  const { request, loading } = useApi()
  const [formData, setFormData] = useState({
    bankName: '',
    logoUrl: '',
  })

  useEffect(() => {
    if (bank) {
      setFormData({
        bankName: bank.bankName || '',
        logoUrl: bank.logoUrl || '',
      })
    }
  }, [bank])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (bank?.id) {
        await request(() => banksService.update(bank.id, formData))
      } else {
        await request(() => banksService.create(formData))
      }
      onSuccess()
    } catch (_error) {
      alert('Erro ao salvar banco')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <Card className="p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {bank ? 'Editar Banco' : 'Novo Banco'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Nome do Banco
            </label>
            <Input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              placeholder="Ex: Banco XYZ"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              URL do Logo
            </label>
            <Input
              type="url"
              name="logoUrl"
              value={formData.logoUrl}
              onChange={handleChange}
              placeholder="https://..."
            />
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

export default BankModal
