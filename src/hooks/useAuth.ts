import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../lib/apiServices';
import type { getAuthRequest } from '../lib/HTTP/Type/authType';

interface UseAuthReturn {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
  login: (data: getAuthRequest) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

export function useAuth(): UseAuthReturn {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any | null>(null);
  const navigate = useNavigate();

  // Verificar autenticação ao carregar o componente
  const checkAuth = useCallback(async (): Promise<boolean> => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        return false;
      }

      const userId = localStorage.getItem('userId');
      if (!userId) {
        setIsAuthenticated(false);
        setUser(null);
        return false;
      }
      
      // Buscar dados do usuário atual
      const response = await authService.getCurrentUser(userId!);
      
      if (response && response.data) {
        setUser(response.data);
        setIsAuthenticated(true);
        return true;
      } else {
        setIsAuthenticated(false);
        setUser(null);
        return false;
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      setIsAuthenticated(false);
      setUser(null);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Login
  const login = async (data: getAuthRequest): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await authService.login(data);
      
      if (response && response.data) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await authService.logout();
      setIsAuthenticated(false);
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Inicializar CSRF token e verificar autenticação ao montar o componente
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Inicializar CSRF token
        await authService.initializeCSRFToken();
      } catch (error) {
        console.error('Erro ao inicializar CSRF token:', error);
      } finally {
        // Verificar autenticação
        await checkAuth();
      }
    };

    initializeAuth();
  }, [checkAuth]);

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    checkAuth
  };
};