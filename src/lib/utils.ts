import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getCategoryName = (categoryId: string): string => {
  return String(categoryId || 'Desconhecida')
}

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-MZ', {
    style: 'currency',
    currency: 'MZN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export const getMonthName = (month: number) => {
  return new Date(2000, month - 1).toLocaleString('pt-BR', { month: 'long' })
}

export const formatPercentage = (value: number) => {
  return `${value.toFixed(1)}%`
}
