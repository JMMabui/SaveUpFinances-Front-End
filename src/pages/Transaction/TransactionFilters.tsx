import { Button } from '@/components/ui/button';
import { DateRangeFilter } from '@/components/dateRangeFilter';

interface TransactionFiltersProps {
  selectedType: 'all' | 'income' | 'expense';
  selectedAccount: string;
  onTypeChange: (type: 'all' | 'income' | 'expense') => void;
  onAccountChange: (account: string) => void;
  onDateRangeChange: (range: { start: string; end: string }) => void;
  accounts: string[];
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
        <Button
          variant={selectedAccount === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onAccountChange('all')}
        >
          Todas as Contas
        </Button>
        {accounts.map((account) => (
          <Button
            key={account}
            variant={selectedAccount === account ? 'default' : 'outline'}
            size="sm"
            onClick={() => onAccountChange(account)}
          >
            {account}
          </Button>
        ))}
      </div>

      <DateRangeFilter onFilterChange={onDateRangeChange} />
    </div>
  );
}
