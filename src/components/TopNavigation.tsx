import {
  FiAlertCircle,
  FiBarChart2,
  FiCalendar,
  FiCreditCard,
  FiDollarSign,
  FiList,
  FiPieChart,
  FiTrendingUp,
} from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'

const navigationItems = [
  { label: 'Dashboard', path: '/dashboard', icon: FiPieChart },
  { label: 'Categorias', path: '/categories', icon: FiList },
  { label: 'Orçamentos', path: '/budgets', icon: FiCalendar },
  { label: 'Cartões de Crédito', path: '/credit-cards', icon: FiCreditCard },
  { label: 'Fontes de Renda', path: '/income-sources', icon: FiDollarSign },
  { label: 'Dívidas', path: '/debts', icon: FiAlertCircle },
  { label: 'Investimentos', path: '/investments', icon: FiTrendingUp },
  { label: 'Relatórios', path: '/reports', icon: FiBarChart2 },
]

export function TopNavigation() {
  const location = useLocation()

  return (
    <nav className="px-6 py-2 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="flex flex-nowrap md:flex-wrap gap-2 overflow-x-auto">
        {navigationItems.map(item => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-700/50 text-gray-700 dark:text-gray-300'
              }`}
            >
              <Icon
                size={18}
                className={
                  isActive
                    ? 'text-indigo-500'
                    : 'text-slate-500 dark:text-slate-400'
                }
              />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
