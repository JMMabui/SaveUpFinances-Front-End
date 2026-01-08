import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { COLORS } from '@/constants/colors'
import { useCreateAccount, useUpdateAccount } from '@/lib/HTTP/account'

interface AccountFormState {
  id?: string
  accountName: string
  accountType: string
  accountHolderName?: string
  balance: number
  bankId?: string | null
  currency?: string
  isActive?: boolean
  isDefault?: boolean
}

const ACCOUNT_TYPES = [
  { value: 'current', label: 'Corrente' },
  { value: 'savings', label: 'Poupança' },
  { value: 'salary', label: 'Salário' },
  { value: 'investment', label: 'Investimento' },
  { value: 'digital', label: 'Digital' },
  { value: 'joint', label: 'Conjunta' },
]

interface AccountModalProps {
  initial: AccountFormState
  onClose: () => void
  banks: any[]
}

export function AccountModal({ initial, onClose, banks }: AccountModalProps) {
  const { register, handleSubmit, reset, watch } = useForm<AccountFormState>({
    defaultValues: initial,
  })

  const create = useCreateAccount()
  const update = useUpdateAccount(initial.id || "")
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") || "" : ""

  // sempre que abrir o modal com dados novos, resetar os campos
  useEffect(() => {
    reset(initial)
  }, [initial, reset])

  const onSubmit = (form: AccountFormState) => {
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
        userId,
        accountName: form.accountName,
        accountType: form.accountType,
        balance: Number(form.balance),
        bankId: form.bankId || null,
        isActive: true,
        isDefault: false,
      } as any)
    }
    onClose()
  }

  const isEditing = !!watch("id")

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-4" style={{ color: COLORS.black[800] }}>
          {isEditing ? "Editar Conta" : "Nova Conta"}
        </h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>
                Nome da Conta
              </label>
              <input
                className="w-full p-2 border rounded"
                {...register("accountName", { required: true })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>
                Tipo
              </label>
              <select className="w-full p-2 border rounded" {...register("accountType", { required: true })}>
                {ACCOUNT_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>
                Banco
              </label>
              <select className="w-full p-2 border rounded" {...register("bankId")}>
                <option value="">Nenhum</option>
                {banks.map((b: any) => (
                  <option key={b.id} value={b.id}>
                    {b.bankName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>
                Saldo
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                {...register("balance", { required: true, valueAsNumber: true })}
              />
            </div>

            {isEditing && (
              <div className="grid grid-cols-2 gap-3">
                <label className="inline-flex items-center gap-2 text-sm" style={{ color: COLORS.black[700] }}>
                  <input type="checkbox" {...register("isActive")} /> Ativa
                </label>
                <label className="inline-flex items-center gap-2 text-sm" style={{ color: COLORS.black[700] }}>
                  <input type="checkbox" {...register("isDefault")} /> Padrão
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