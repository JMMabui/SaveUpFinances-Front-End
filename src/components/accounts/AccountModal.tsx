import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { COLORS } from '@/constants/colors'
import { useCreateAccount, useUpdateAccount } from '@/lib/HTTP/account'
import type { accountRequest } from '@/lib/HTTP/Type/account.type'
import { Input } from '../ui/input'

const ACCOUNT_TYPES = [
  { value: 'current', label: 'Corrente' },
  { value: 'savings', label: 'Poupança' },
  { value: 'salary', label: 'Salário' },
  { value: 'investment', label: 'Investimento' },
  { value: 'digital', label: 'Digital' },
  { value: 'joint', label: 'Conjunta' },
]

const CURRENCY = [
  { value: 'MZN', label: 'Metical' },
  { value: 'ZAR', label: 'Rand' },
  { value: 'USD', label: 'Dolar Americano' },
  { value: 'EUR', label: 'Euro' },
  { value: 'GBP', label: 'Libra' },
  { value: 'BRL', label: 'Real' },
]

interface AccountModalProps {
  initial: accountRequest
  onClose: () => void
  banks: any[]
}

export function AccountModal({ initial, onClose, banks }: AccountModalProps) {
  const { register, handleSubmit, reset, watch } = useForm<accountRequest>({
    defaultValues: initial,
  })

  const create = useCreateAccount()
  const update = useUpdateAccount(initial.id || '')
  const userId =
    typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''
  console.log('id do usuario, ', userId)
  // sempre que abrir o modal com dados novos, resetar os campos
  useEffect(() => {
    reset(initial)
  }, [initial, reset])

  const onSubmit = (form: accountRequest) => {
    console.log('Account form data, ', form)
    if (form.id) {
      update.mutate({
        accountName: form.accountName,
        accountType: form.accountType,
        balance: Number(form.balance),
        bankId: form.bankId || null,
        isActive: form.isActive,
        isDefault: form.isDefault,
      } as any)
    } else {
      create.mutate({
        userId: userId,
        accountName: form.accountName,
        accountType: form.accountType,
        accountHolderName: form.accountHolderName,
        balance: Number(form.balance),
        bankId: form.bankId || null,
        currency: form.currency,
        isActive: true,
        isDefault: false,
      } as any)
    }
    onClose()
  }

  const isEditing = !!watch('id')

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3
          className="text-xl font-bold mb-4"
          style={{ color: COLORS.black[800] }}
        >
          {isEditing ? 'Editar Conta' : 'Nova Conta'}
        </h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: COLORS.black[700] }}
              >
                Nome da Conta
              </label>
              <Input
                className="w-full p-2 border rounded"
                {...register('accountName', { required: true })}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: COLORS.black[700] }}
              >
                Titular da Conta
              </label>
              <Input
                className="w-full p-2 border rounded"
                {...register('accountHolderName', { required: true })}
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: COLORS.black[700] }}
              >
                Tipo
              </label>
              <select
                className="w-full p-2 border rounded"
                {...register('accountType', { required: true })}
              >
                {ACCOUNT_TYPES.map(t => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: COLORS.black[700] }}
              >
                Banco
              </label>
              <select
                className="w-full p-2 border rounded"
                {...register('bankId')}
              >
                <option value="">Nenhum</option>
                {banks.map((b: any) => (
                  <option key={b.id} value={b.id}>
                    {b.bankName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: COLORS.black[700] }}
              >
                Tipo de Moeda
              </label>
              <select
                className="w-full p-2 border rounded"
                {...register('currency', { required: true })}
              >
                {CURRENCY.map(t => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: COLORS.black[700] }}
              >
                Saldo
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                {...register('balance', {
                  required: true,
                  valueAsNumber: true,
                })}
              />
            </div>

            {isEditing && (
              <div className="grid grid-cols-2 gap-3">
                <label
                  className="inline-flex items-center gap-2 text-sm"
                  style={{ color: COLORS.black[700] }}
                >
                  <input type="checkbox" {...register('isActive')} /> Ativa
                </label>
                <label
                  className="inline-flex items-center gap-2 text-sm"
                  style={{ color: COLORS.black[700] }}
                >
                  <input type="checkbox" {...register('isDefault')} /> Padrão
                </label>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
