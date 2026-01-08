import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import type { getAuthRequest } from '../lib/HTTP/Type/authType';

// Definindo o tipo do contexto
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
  login: (data: getAuthRequest) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

// Criando o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props do provedor
interface AuthProviderProps {
  children: ReactNode;
}

// Componente provedor
export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar o contexto
export function useAuthContext() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuthContext deve ser usado dentro de um AuthProvider');
  }
  
  return context;
}