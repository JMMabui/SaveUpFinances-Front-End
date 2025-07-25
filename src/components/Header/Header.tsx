import { useState } from 'react';
import { Button } from '../Button/Button';
import { twMerge } from 'tailwind-merge';
import { useNavigate } from 'react-router-dom';

interface MenuItem {
  label: string;
  href: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    label: 'Início',
    href: '/',
  },
  {
    label: 'Serviços',
    href: '#',
    children: [
      { label: 'Gestão de Negócios', href: '/servicos/gestao-negocios' },
      { label: 'Poupança', href: '/servicos/poupanca' },
      { label: 'Remessas', href: '/servicos/remessas' },
      { label: 'Investimentos', href: '/servicos/investimentos' },
    ],
  },
  {
    label: 'Recursos',
    href: '#',
    children: [
      { label: 'Blog', href: '/blog' },
      { label: 'Tutoriais', href: '/tutoriais' },
      { label: 'Dicas Financeiras', href: '/dicas' },
      { label: 'Calculadoras', href: '/calculadoras' },
    ],
  },
  {
    label: 'Sobre',
    href: '#',
    children: [
      { label: 'Nossa História', href: '/sobre/historia' },
      { label: 'Equipe', href: '/sobre/equipe' },
      { label: 'Parceiros', href: '/sobre/parceiros' },
      { label: 'Carreiras', href: '/sobre/carreiras' },
    ],
  },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-green-600">
              SaveUpFinances
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div key={item.label} className="relative group">
                <button
                  type="button"
                  onClick={() => item.children && toggleDropdown(item.label)}
                  className={twMerge(
                    'text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium',
                    activeDropdown === item.label && 'text-green-600'
                  )}
                >
                  {item.label}
                </button>
                {item.children && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-1">
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="small" onClick={handleLogin}>
              Entrar
            </Button>
            <Button variant="primary" size="small">
              Criar Conta
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="text-gray-700 hover:text-green-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <div key={item.label}>
                  <button
                    type="button"
                    onClick={() => item.children && toggleDropdown(item.label)}
                    className={twMerge(
                      'w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600',
                      activeDropdown === item.label && 'text-green-600'
                    )}
                  >
                    {item.label}
                  </button>
                  {item.children && activeDropdown === item.label && (
                    <div className="pl-4">
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-green-600"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-5">
                  <Button variant="outline" size="small" className="w-full mb-2">
                    Entrar
                  </Button>
                </div>
                <div className="flex items-center px-5">
                  <Button variant="primary" size="small" className="w-full">
                    Criar Conta
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}; 