import { useNavigate } from 'react-router-dom';
import { getUserById } from '../HTTP/user';
import { Button } from './Button';
import { FiLogOut, FiUser } from 'react-icons/fi';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/NavigatorBar/navigation-menu"
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
import { BiMoneyWithdraw } from 'react-icons/bi';
import { HiOutlineAdjustments } from 'react-icons/hi';

export function checkUserLoggedIn() {
  const userId = localStorage.getItem('userId');
  if (!userId) {

    window.location.href = '/login';
    return false;
  }
  return !!userId;
};

export function Header() {
  const navigate = useNavigate();
  const userId = checkUserLoggedIn() ? localStorage.getItem('userId') : null;
  if (!userId) {
    navigate('/login');
    return null; // or a placeholder/header for non-logged-in users
  }
  const user = getUserById(userId);

  function onLogout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload();
  }

  return (
   <header className="flex flex-wrap items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      {/* Perfil do usuário */}
      <div className="flex items-center gap-4">
        {user.data?.data.avatar ? (
          <img
            src={user.data?.data.avatar}
            alt={`Avatar de ${user.data?.data.name}`}
            className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600 object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            <FiUser className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </div>
        )}
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900 dark:text-white">
            {user.data?.data.name || 'Usuário'}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {user.data?.data.email || 'Não logado'}
          </span>
        </div>
      </div>

      {/* Menu de navegação */}
      <div className="mt-4 md:mt-0">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            <NavigationMenuItem>
              <NavigationMenuLink href="/dashboard" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                <FiPieChart /> Dashboard
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                <HiOutlineAdjustments />
                Planejamento Financeiro
              </NavigationMenuTrigger>
              <NavigationMenuContent className="flex flex-col gap-2 p-2">
                <NavigationMenuLink href="/budgets" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                  <FiCalendar /> Orçamentos
                </NavigationMenuLink>
                <NavigationMenuLink href="/categories" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                  <FiList /> Categorias
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                <BiMoneyWithdraw/> Finanças Pessoais
              </NavigationMenuTrigger>
              <NavigationMenuContent className="flex flex-col gap-2 p-2">
                <NavigationMenuLink href="/income-sources" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                  <FiDollarSign /> Fontes de Renda
                </NavigationMenuLink>
                <NavigationMenuLink href="/credit-cards" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                  <FiCreditCard /> Cartões de Crédito
                </NavigationMenuLink>
                <NavigationMenuLink href="/debts" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                  <FiAlertCircle /> Dívidas
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink href="/investments" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                <FiTrendingUp /> Investimentos
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink href="/reports" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
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
          onClick={onLogout}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors rounded-md"
        >
          <FiLogOut className="w-4 h-4" />
          Sair
        </Button>
      </div>
    </header>)
}