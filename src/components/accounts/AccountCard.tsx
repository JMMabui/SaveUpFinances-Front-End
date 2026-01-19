import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { COLORS } from '@/constants/colors'
import { useUpdateAccount } from '@/lib/HTTP/account'
import {
  useCreateAccountBalance,
  useGetAccountBalanceByAccount,
} from '@/lib/HTTP/account-balance'

interface AccountCardProps {
  acc: any
  banks: any[]
  onEdit: () => void
  onDelete: () => void
}

export function AccountCard({
  acc,
  banks,
  onEdit,
  onDelete,
}: AccountCardProps) {
  const update = useUpdateAccount(acc.id)
  const { data: history } = useGetAccountBalanceByAccount(acc.id)
  const balances = history?.data || []
  const addSnapshot = useCreateAccountBalance()

  return (
    <Card className="border" style={{ borderColor: COLORS.blue[100] }}>
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h3
              className="text-lg font-semibold"
              style={{ color: COLORS.black[800] }}
            >
              {acc.accountName}
            </h3>
            <p className="text-sm" style={{ color: COLORS.black[600] }}>
              {acc.accountType} •{' '}
              {banks.find((b: any) => b.id === acc.bankId)?.bankName || '-'}
            </p>
            <div className="text-xs mt-1" style={{ color: COLORS.black[600] }}>
              {acc.isDefault ? 'Conta padrão' : 'Conta secundária'} •{' '}
              {acc.isActive ? 'Ativa' : 'Inativa'}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={onEdit}>
              Editar
            </Button>
            <Button variant="destructive" size="sm" onClick={onDelete}>
              Excluir
            </Button>
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <span style={{ color: COLORS.black[600] }}>Saldo</span>
          <span className="font-medium" style={{ color: COLORS.black[800] }}>
            {acc.balance.toLocaleString()} Mt
          </span>
        </div>
        <div className="flex gap-2 mt-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => update.mutate({ isDefault: true })}
          >
            Definir como padrão
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => update.mutate({ isActive: !acc.isActive })}
          >
            {acc.isActive ? 'Desativar' : 'Ativar'}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              addSnapshot.mutate({
                accountId: acc.id,
                date: new Date().toISOString(),
                balance: acc.balance,
              })
            }
          >
            Salvar saldo atual
          </Button>
        </div>
        {balances.length > 0 && (
          <div className="mt-3">
            <div
              className="text-sm font-medium mb-1"
              style={{ color: COLORS.black[700] }}
            >
              Histórico de saldo
            </div>
            <div className="max-h-40 overflow-y-auto space-y-1">
              {balances.slice(0, 6).map((b: any) => (
                <div
                  key={b.id}
                  className="flex justify-between text-xs"
                  style={{ color: COLORS.black[600] }}
                >
                  <span>{new Date(b.date).toLocaleDateString()}</span>
                  <span>{b.balance.toLocaleString()} Mt</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
