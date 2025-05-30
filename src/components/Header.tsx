import { Button } from './Button';
import { FiLogOut, FiUser } from 'react-icons/fi';

interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

interface HeaderProps {
  user?: User;
  onLogout: () => void;
  onToggleTheme: () => void;
  theme: 'light' | 'dark';
}

export const Header = ({ user, onLogout, onToggleTheme, theme }: HeaderProps) => (
  <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
    <div className="flex items-center gap-3">
      {user?.avatar ? (
        <img 
          src={user.avatar} 
          alt={`Avatar de ${user.name}`} 
          className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-gray-600"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <FiUser className="w-6 h-6 text-gray-500 dark:text-gray-400" />
        </div>
      )}
      <div className="flex flex-col">
        <span className="font-semibold text-gray-900 dark:text-gray-100">
          {user?.name || 'Usuário'}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {user?.email || 'Não logado'}
        </span>
      </div>
    </div>

    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={onLogout}
        className="flex items-center gap-2"
      >
        <FiLogOut className="w-4 h-4" />
        Sair
      </Button>

      <button
        type="button"
        onClick={onToggleTheme}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
      >
        {theme === 'dark' ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
          </svg>
        )}
      </button>
    </div>
  </header>
); 