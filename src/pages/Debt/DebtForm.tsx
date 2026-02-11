import type React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import type { debtsRequest, debtsResponse } from '@/lib/HTTP/Type/debts.type'

interface DebtFormProps {
  initialDebt?: debtsResponse
  onSave: (debt: debtsRequest) => void
  onCancel: () => void
}

export const DebtForm: React.FC<DebtFormProps> = ({
  initialDebt,
  onSave,
  onCancel,
}) => {
  const [descricao, setDescricao] = useState(initialDebt?.description || '')
  const [valor, setValor] = useState<number>(Number(initialDebt?.amount ?? 0))
  const [credor, setCredor] = useState(initialDebt?.creditor || '')
  const [dataVencimento, setDataVencimento] = useState(
    (initialDebt?.dueDate as any as string) || ''
  )
  const [status, setStatus] = useState<'pendente' | 'paga'>(
    initialDebt?.status === 'PAID' ? 'paga' : 'pendente'
  )
  const [observacoes, setObservacoes] = useState(initialDebt?.notes || '')
  const [touched, setTouched] = useState<{ [k: string]: boolean }>({})

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!descricao || !valor || !credor || !dataVencimento)
      return setTouched({
        descricao: true,
        valor: true,
        credor: true,
        dataVencimento: true,
      })
    onSave({
      description: descricao,
      amount: valor,
      creditor: credor,
      dueDate: dataVencimento,
      status: status === 'paga' ? 'PAID' : 'PENDING',
      notes: observacoes || undefined,
      paymentDate: status === 'paga' ? new Date().toISOString() : undefined,
      userId: '', // será preenchido em DebtManagement ao criar
    })
  }

  function handleBlur(field: string) {
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  return (
    <Sheet
      open
      onOpenChange={open => {
        if (!open) onCancel()
      }}
    >
      <SheetContent side="right" className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>
            {initialDebt ? 'Editar Dívida' : 'Nova Dívida'}
          </SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 px-4">
            <div>
              <Input
                label="Descrição *"
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
                onBlur={() => handleBlur('descricao')}
                placeholder="Ex: Empréstimo Banco"
                required
                error={
                  touched.descricao && !descricao
                    ? 'Campo obrigatório'
                    : undefined
                }
              />
            </div>
            <div>
              <Input
                label="Valor *"
                type="number"
                value={valor}
                onChange={e => setValor(Number(e.target.value))}
                onBlur={() => handleBlur('valor')}
                placeholder="R$ 0,00"
                required
                error={
                  touched.valor && !valor ? 'Campo obrigatório' : undefined
                }
              />
            </div>
            <div>
              <Input
                label="Credor *"
                value={credor}
                onChange={e => setCredor(e.target.value)}
                onBlur={() => handleBlur('credor')}
                placeholder="Ex: Banco XYZ"
                required
                error={
                  touched.credor && !credor ? 'Campo obrigatório' : undefined
                }
              />
            </div>
            <div>
              <Input
                label="Data de Vencimento *"
                type="date"
                value={dataVencimento}
                onChange={e => setDataVencimento(e.target.value)}
                onBlur={() => handleBlur('dataVencimento')}
                required
                error={
                  touched.dataVencimento && !dataVencimento
                    ? 'Campo obrigatório'
                    : undefined
                }
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Status</label>
              <Select
                value={status}
                onValueChange={value => setStatus(value as any)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecionar status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="paga">Paga</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block font-medium mb-1">Observações</label>
              <textarea
                className="border rounded px-3 py-2 w-full"
                value={observacoes}
                onChange={e => setObservacoes(e.target.value)}
                placeholder="Opcional"
              />
            </div>
          </div>
          <SheetFooter className="px-4 mt-4">
            <Button type="submit">Salvar</Button>
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancelar
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
