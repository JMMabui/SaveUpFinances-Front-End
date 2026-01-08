import { twMerge } from 'tailwind-merge';
import { InputHTMLAttributes, useState } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = ({
  label,
  error,
  className,
  fullWidth = true,
  type = 'text',
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';
  const inputType = isPasswordField && showPassword ? 'text' : type;

  const baseClasses = 'appearance-none rounded-md relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm';
  const errorClasses = error ? 'border-red-500' : 'border-gray-300';
  const widthClasses = fullWidth ? 'w-full' : 'w-auto';

  return (
    <div className={widthClasses}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={inputType}
          className={twMerge(
            baseClasses,
            errorClasses,
            isPasswordField ? 'pr-10' : '',
            className
          )}
          {...props}
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            title={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12c2.292 5.118 7.169 8.5 12.064 8.5a13.504 13.504 0 005.324-1.047M6.3 6.3a10.447 10.447 0 0115.4 15.4M9.865 9.865c-1.33 1.33-1.33 3.48 0 4.81 1.33 1.33 3.48 1.33 4.81 0m0-4.81a2.5 2.5 0 00-3.536 3.536m7.072-7.072l3.528-3.528m0 0a2.5 2.5 0 113.536 3.536L17.393 9.39M6.343 17.657l-3.528 3.528m0 0a2.5 2.5 0 113.536-3.536"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}; 