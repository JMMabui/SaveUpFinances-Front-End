import { twMerge } from 'tailwind-merge';
import type { SelectHTMLAttributes } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  error?: string;
  fullWidth?: boolean;
}

export const Select = ({
  label,
  options,
  error,
  className,
  fullWidth = true,
  ...props
}: SelectProps) => {
  const baseClasses = 'appearance-none rounded-md relative block w-full px-3 py-2 border bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm';
  const errorClasses = error ? 'border-red-500' : 'border-gray-300';
  const widthClasses = fullWidth ? 'w-full' : 'w-auto';

  return (
    <div className={widthClasses}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        className={twMerge(baseClasses, errorClasses, className)}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}; 