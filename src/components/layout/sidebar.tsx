import { BiMoneyWithdraw } from 'react-icons/bi'
import {
  FiBarChart2,
  FiCalendar,
  FiCreditCard,
  FiDollarSign,
  FiList,
  FiPieChart,
  FiTrendingDown,
  FiTrendingUp,
} from 'react-icons/fi'
import { NavLink } from 'react-router-dom'

const navItems = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    icon: <FiPieChart className="size-4" />,
  },
  {
    to: '/budgets',
    label: 'Orçamentos',
    icon: <FiCalendar className="size-4" />,
  },
  {
    to: '/categories',
    label: 'Categorias',
    icon: <FiList className="size-4" />,
  },
  {
    to: '/income-sources',
    label: 'Fontes de Renda',
    icon: <FiDollarSign className="size-4" />,
  },
  {
    to: '/credit-cards',
    label: 'Cartões de Crédito',
    icon: <FiCreditCard className="size-4" />,
  },
  {
    to: '/accounts',
    label: 'Contas',
    icon: <BiMoneyWithdraw className="size-4" />,
  },
  { to: '/debts', label: 'Dívidas', icon: <FiTrendingDown className="size-4" /> },
  { to: '/expenses', label: 'Despesas', icon: <FiBarChart2 className="size-4" /> },
  {
    to: '/investments',
    label: 'Investimentos',
    icon: <FiTrendingUp className="size-4" />,
  },
  {
    to: '/reports',
    label: 'Relatórios',
    icon: <FiBarChart2 className="size-4" />,
  },
]

export function Sidebar() {
  return (
    <aside className="h-screen border-r bg-sidebar text-sidebar-foreground fixed left-0 top-0 w-64 hidden md:block">
      <div className="h-16 flex items-center px-4 border-b">
        <div className="flex items-center gap-2">
          <img src="/vite.svg" alt="Logo" className="size-6" />
          <span className="font-semibold">SaveUp Finances</span>
        </div>
      </div>
      <nav className="p-2 space-y-1">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
                isActive
                  ? 'bg-accent text-accent-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground',
              ].join(' ')
            }
          >
            {item.icon}
            <span className="text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
