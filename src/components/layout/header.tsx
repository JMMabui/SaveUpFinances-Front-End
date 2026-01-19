import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@radix-ui/react-navigation-menu'
import { BiMoneyWithdraw } from 'react-icons/bi'
import {
  FiAlertCircle,
  FiBarChart2,
  FiCalendar,
  FiCreditCard,
  FiDollarSign,
  FiList,
  FiLogOut,
  FiPieChart,
  FiTrendingUp,
  FiUser,
} from 'react-icons/fi'
import { HiOutlineAdjustments } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { useLogout } from '@/hooks/auth'
import { getUserById } from '@/lib/HTTP/user'
import { Button } from '../ui/button'

export function checkUserLoggedIn() {
  const userId = localStorage.getItem('userId')
  return !!userId
}
export function Header() {
  const navigate = useNavigate()
  const onLogout = useLogout()
  const userId = checkUserLoggedIn() ? localStorage.getItem('userId') : null
  if (!userId) {
    navigate('/login')
    return null
  }
  const user = getUserById(userId)

  return (
    <header
      className="flex flex-wrap items-center justify-between px-6 py-4 
      bg-gradient-to-r from-green-500 via-green-400 to-yellow-400 
      dark:from-green-700 dark:via-green-600 dark:to-yellow-600
      border-b border-green-300 dark:border-gray-700 shadow-md"
    >
      {/* Perfil do usuário */}
      <div className="flex items-center gap-4">
        {user.data?.data.avatar ? (
          <img
            src={user.data?.data.avatar}
            alt={`Avatar de ${user.data?.data.name}`}
            className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-700 object-cover shadow-sm"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800 flex items-center justify-center">
            <FiUser className="w-6 h-6 text-white dark:text-gray-300" />
          </div>
        )}
        <div className="flex flex-col">
          <span className="font-semibold text-white">
            {user.data?.data.name || 'Usuário'}
          </span>
          <span className="text-sm text-white/80">
            {user.data?.data.email || 'Não logado'}
          </span>
        </div>
      </div>

      {/* Menu de navegação */}
      <div className="mt-4 md:mt-0">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/dashboard"
                className="flex items-center gap-2 text-white hover:text-yellow-200 transition-colors"
              >
                <FiPieChart /> Dashboard
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center gap-2 text-white hover:text-yellow-200 transition-colors">
                <HiOutlineAdjustments />
                Planejamento Financeiro
              </NavigationMenuTrigger>
              <NavigationMenuContent className="flex flex-col gap-2 p-2 bg-white/90 dark:bg-gray-800 rounded-md shadow-md">
                <NavigationMenuLink
                  href="/budgets"
                  className="flex items-center gap-2 hover:text-green-600 transition-colors"
                >
                  <FiCalendar /> Orçamentos
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="/categories"
                  className="flex items-center gap-2 hover:text-green-600 transition-colors"
                >
                  <FiList /> Categorias
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center gap-2 text-white hover:text-yellow-200 transition-colors">
                <BiMoneyWithdraw /> Finanças Pessoais
              </NavigationMenuTrigger>
              <NavigationMenuContent className="flex flex-col gap-2 p-2 bg-white/90 dark:bg-gray-800 rounded-md shadow-md">
                <NavigationMenuLink
                  href="/income-sources"
                  className="flex items-center gap-2 hover:text-green-600 transition-colors"
                >
                  <FiDollarSign /> Fontes de Renda
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="/credit-cards"
                  className="flex items-center gap-2 hover:text-green-600 transition-colors"
                >
                  <FiCreditCard /> Cartões de Crédito
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="/accounts"
                  className="flex items-center gap-2 hover:text-green-600 transition-colors"
                >
                  <FiList /> Contas
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="/debts"
                  className="flex items-center gap-2 hover:text-red-500 transition-colors"
                >
                  <FiAlertCircle /> Dívidas
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="/investments"
                className="flex items-center gap-2 text-white hover:text-yellow-200 transition-colors"
              >
                <FiTrendingUp /> Investimentos
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="/reports"
                className="flex items-center gap-2 text-white hover:text-yellow-200 transition-colors"
              >
                <FiBarChart2 /> Relatórios
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Ações */}
      <div className="flex items-center gap-3 mt-4 md:mt-0">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => onLogout.mutate()}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium 
            text-green-700 bg-white dark:bg-gray-800 dark:text-white 
            hover:bg-yellow-100 dark:hover:bg-gray-700 transition-colors rounded-md shadow-sm"
        >
          <FiLogOut className="w-4 h-4" />
          Sair
        </Button>
      </div>
    </header>
  )
}
