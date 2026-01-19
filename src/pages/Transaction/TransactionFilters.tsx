import { DateRangeFilter } from '@/components/DateRangeFilter'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

interface TransactionFiltersProps {
  selectedType: 'all' | 'income' | 'expense'
  selectedAccount: string
  onTypeChange: (type: 'all' | 'income' | 'expense') => void
  onAccountChange: (account: string) => void
  onDateRangeChange: (range: { start: string; end: string }) => void
  accounts: string[]
}

export function TransactionFilters({
  selectedType,
  selectedAccount,
  onTypeChange,
  onAccountChange,
  onDateRangeChange,
  accounts,
}: TransactionFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedType === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onTypeChange('all')}
        >
          Todos
        </Button>
        <Button
          variant={selectedType === 'income' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onTypeChange('income')}
        >
          Receitas
        </Button>
        <Button
          variant={selectedType === 'expense' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onTypeChange('expense')}
        >
          Despesas
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Select
          value={selectedAccount}
          onValueChange={value => onAccountChange(value)}
        >
          <SelectTrigger className="w-fit min-w-48">
            <SelectValue placeholder="Selecionar conta" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Contas</SelectItem>
            {accounts.map(account => (
              <SelectItem key={account} value={account}>
                {account}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DateRangeFilter onFilterChange={onDateRangeChange} />
    </div>
  )
}
