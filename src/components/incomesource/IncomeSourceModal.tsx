import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { COLORS } from '@/constants/colors'
import {
  useCreateIncomeSource,
  useDeleteIncomeSource,
  useUpdateIncomeSource,
} from '@/lib/HTTP/income-sources'

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
      frequency: '',
      startDate: new Date().toISOString().slice(0, 10),
      endDate: null,
    }
  )

  const userId =
    typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''
  const createSource = useCreateIncomeSource()
  const updateSource = useUpdateIncomeSource(source?.id || '')
  const deleteSource = useDeleteIncomeSource()

  return (
    <Sheet
      open
      onOpenChange={open => {
        if (!open) onClose()
      }}
    >
      <SheetContent side="right" className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle style={{ color: COLORS.black[800] }}>
            {source ? 'Editar Fonte de Renda' : 'Nova Fonte de Renda'}
          </SheetTitle>
        </SheetHeader>

        <form
          onSubmit={e => {
            e.preventDefault()
            if (source) {
              updateSource.mutate({
                name: formData.name!,
                frequency: formData.frequency!,
                startDate: formData.startDate!,
                endDate: formData.endDate ?? null,
              })
            } else {
              createSource.mutate({
                name: formData.name!,
                frequency: formData.frequency || 'mensal',
                startDate: formData.startDate!,
                endDate: formData.endDate ?? null,
                isActive: true,
                userId,
              } as any)
            }
            onClose()
          }}
        >
          <div className="space-y-4 px-4">
            <div>
              <Input
                label="Nome da Fonte"
                value={formData.name || ''}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Input
                label="Frequência"
                value={formData.frequency || ''}
                onChange={e =>
                  setFormData({ ...formData, frequency: e.target.value })
                }
                placeholder="Ex: mensal, semanal"
                required
              />
            </div>
            <div>
              <Input
                label="Início"
                type="date"
                value={formData.startDate || ''}
                onChange={e =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Input
                label="Fim (opcional)"
                type="date"
                value={formData.endDate || ''}
                onChange={e =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
              />
            </div>
          </div>

          <SheetFooter className="px-4 mt-6">
            {source && (
              <Button
                variant="destructive"
                type="button"
                onClick={() => {
                  deleteSource.mutate(source.id)
                  onClose()
                }}
              >
                Excluir
              </Button>
            )}
            <Button variant="outline" onClick={onClose} type="button">
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
