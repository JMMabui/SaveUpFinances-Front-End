import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { COLORS } from '@/constants/colors'
import { useCreateIncomeSource, useUpdateIncomeSource, useDeleteIncomeSource } from '@/lib/HTTP/income-sources'

interface IncomeSource {
  id: string
  name: string
  frequency?: string
  startDate?: string
  endDate?: string | null
  userId?: string
}

interface IncomeSourceModalProps {
  source: IncomeSource | null
  onClose: () => void
}

export function IncomeSourceModal({ source, onClose }: IncomeSourceModalProps) {
  const [formData, setFormData] = useState<Partial<IncomeSource>>(
    source || {
      name: '',
    }
  )

  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''
  const createSource = useCreateIncomeSource()
  const updateSource = useUpdateIncomeSource(source?.id || '')
  const deleteSource = useDeleteIncomeSource()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-4" style={{ color: COLORS.black[800] }}>
          {source ? 'Editar Fonte de Renda' : 'Nova Fonte de Renda'}
        </h3>

        <form
          onSubmit={e => {
            e.preventDefault()
            if (source) {
              updateSource.mutate({ name: formData.name! })
            } else {
              createSource.mutate({ name: formData.name!, userId } as any)
            }
            onClose()
          }}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>
                Nome da Fonte
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            {source && (
              <Button variant="destructive" type="button" onClick={() => { deleteSource.mutate(source.id); onClose() }}>Excluir</Button>
            )}
            <Button variant="outline" onClick={onClose} type="button">
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </div>
    </div>
  )
}