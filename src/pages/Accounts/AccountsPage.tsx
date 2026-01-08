import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MainLayout } from '@/components/layout/mainLayout'
import { getAccountsByUserId, useDeleteAccount } from '@/lib/HTTP/account'
import { useGetBanks } from '@/lib/HTTP/banks'
import { COLORS } from '@/constants/colors'
import { accountResponse, accountsResponse } from '@/lib/HTTP/Type/account.type'
import { AccountsList, AccountModal, TransferModal } from '@/components'

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

export function AccountsPage() {
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''
  const { data } = getAccountsByUserId(userId)
  const accounts: accountResponse[] =
   (data?.data && 'accounts' in data.data ? ((data.data as unknown) as accountsResponse).accounts : []) ?? []

  console.log('accounts', accounts)

  const { data: banksData } = useGetBanks()
  const banks = banksData?.data || []

  const del = useDeleteAccount()

  const [editing, setEditing] = useState<AccountFormState | null>(null)
  const [transferOpen, setTransferOpen] = useState(false)

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold" style={{ color: COLORS.black[800] }}>Contas</h2>
          <div className="flex gap-2">
            <Button onClick={() => setTransferOpen(true)} variant="secondary">Transferir</Button>
            <Button onClick={() => setEditing({ accountName: '', accountType: 'current', balance: 0, bankId: null, isActive: true, isDefault: false })}>Nova Conta</Button>
          </div>
        </div>

        <AccountsList accounts={accounts} banks={banks} onEdit={(acc) => setEditing({ id: acc.id, accountName: acc.accountName, accountType: acc.accountType, balance: acc.balance, bankId: acc.bankId, isActive: acc.isActive, isDefault: acc.isDefault })} onDelete={(id) => del.mutate(id)} />

        {editing && <AccountModal initial={editing} onClose={() => setEditing(null)} banks={banks} />}
        {transferOpen && <TransferModal onClose={() => setTransferOpen(false)} accounts={accounts} />}
      </div>
    </MainLayout>
  )
}
