import type React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from './AuthProvider'

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
}

export function ProtectedRoute({
  children,
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuthContext()
  const location = useLocation()

  // Mostra um indicador de carregamento enquanto verifica a autenticação
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-gray-300 border-t-green-500 animate-spin" />
          <span className="text-sm text-gray-600">Carregando...</span>
        </div>
      </div>
    )
  }

  // Redireciona para a página de login se não estiver autenticado
  if (!isAuthenticated) {
    return (
      <Navigate to={redirectTo} replace state={{ from: location.pathname }} />
    )
  }

  // Renderiza o conteúdo protegido se estiver autenticado
  return <>{children}</>
}
