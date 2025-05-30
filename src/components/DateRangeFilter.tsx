import { useState } from 'react';
import { Button } from './Button';

interface DateRangeFilterProps {
  onFilterChange: (range: { start: string; end: string }) => void;
}

export function DateRangeFilter({ onFilterChange }: DateRangeFilterProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilter = () => {
    if (startDate && endDate) {
      onFilterChange({ start: startDate, end: endDate });
    }
  };

  const handleClear = () => {
    setStartDate('');
    setEndDate('');
    onFilterChange({ start: '', end: '' });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Filtrar por Período</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Data Inicial
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            Data Final
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          variant="secondary"
          onClick={handleClear}
          disabled={!startDate && !endDate}
        >
          Limpar
        </Button>
        <Button
          onClick={handleFilter}
          disabled={!startDate || !endDate}
        >
          Filtrar
        </Button>
      </div>
    </div>
  );
} 