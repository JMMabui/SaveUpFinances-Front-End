import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  color?: string // Tailwind color classes, ex: 'bg-blue-600'
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warnig'
    | 'info'
    | 'light'
    | 'dark'
    | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'xs'
}

const variantClasses: Record<string, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400',
  secondary:
    'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
  success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-400',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-400',
  warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400',
  info: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400',
  light:
    'bg-white text-gray-800 hover:bg-gray-100 focus:ring-gray-400 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700',
  dark: 'bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-600',
  outline:
    'border border-gray-300 text-gray-800 hover:bg-gray-100 focus:ring-gray-400 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700',
}

const sizeClasses: Record<string, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
  xs: 'px-2 py-1 text-xs'
}

export const Button = ({
  children,
  color,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) => {
  const baseClass = color || variantClasses[variant] || variantClasses.primary
  return (
    <button
      className={`rounded-lg font-semibold shadow transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
        baseClass
      } ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
