import { Button } from '../../components/Button';
import { DateRangeFilter } from '../../components/DateRangeFilter';

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
          variant={selectedType === 'all' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onTypeChange('all')}
        >
          Todos
        </Button>
        <Button
          variant={selectedType === 'income' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onTypeChange('income')}
        >
          Receitas
        </Button>
        <Button
          variant={selectedType === 'expense' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onTypeChange('expense')}
        >
          Despesas
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedAccount === 'all' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onAccountChange('all')}
        >
          Todas as Contas
        </Button>
        {accounts.map((account) => (
          <Button
            key={account}
            variant={selectedAccount === account ? 'primary' : 'secondary'}
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
