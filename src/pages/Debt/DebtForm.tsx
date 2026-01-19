import type React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import type { Debt } from '@/types/Debt'

interface DebtFormProps {
  initialDebt?: Debt
  onSave: (debt: Debt) => void
  onCancel: () => void
}

export const DebtForm: React.FC<DebtFormProps> = ({
  initialDebt,
  onSave,
  onCancel,
}) => {
  const [descricao, setDescricao] = useState(initialDebt?.descricao || '')
  const [valor, setValor] = useState(initialDebt?.valor || 0)
  const [credor, setCredor] = useState(initialDebt?.credor || '')
  const [dataVencimento, setDataVencimento] = useState(
    initialDebt?.dataVencimento || ''
  )
  const [status, setStatus] = useState<'pendente' | 'paga'>(
    initialDebt?.status || 'pendente'
  )
  const [observacoes, setObservacoes] = useState(initialDebt?.observacoes || '')
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
      id: initialDebt?.id || Math.random().toString(36).substr(2, 9),
      descricao,
      valor,
      credor,
      dataVencimento,
      status,
      observacoes,
      dataPagamento: status === 'paga' ? new Date().toISOString() : undefined,
    })
  }

  function handleBlur(field: string) {
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded shadow max-w-md mx-auto space-y-4"
    >
      <h2 className="text-xl font-bold mb-4">
        {initialDebt ? 'Editar Dívida' : 'Nova Dívida'}
      </h2>
      <div>
        <Input
          label="Descrição *"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          onBlur={() => handleBlur('descricao')}
          placeholder="Ex: Empréstimo Banco"
          required
          error={touched.descricao && !descricao ? 'Campo obrigatório' : undefined}
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
          error={touched.valor && !valor ? 'Campo obrigatório' : undefined}
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
          error={touched.credor && !credor ? 'Campo obrigatório' : undefined}
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
        <Select value={status} onValueChange={value => setStatus(value as any)}>
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
      <div className="flex gap-2 mt-4">
        <Button type="submit">Salvar</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
