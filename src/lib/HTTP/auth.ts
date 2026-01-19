import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authService } from '../apiServices'
import type { getAuthRequest } from './Type/authType'

export function useAuthCreate(redirectTo: string = '/dashboard') {
  const navigate = useNavigate()

  return useMutation({
    mutationKey: ['authCreate'],
    mutationFn: async (data: getAuthRequest) => {
      return authService.login(data)
    },

    onSuccess: data => {
      console.log('Login successful:', data)
      localStorage.setItem('token', data.data.token)
      localStorage.setItem('userId', data.data.user.id)
      navigate(redirectTo)
    },

    onError: (error: any) => {
      if (error.status === 401) {
        alert('Login falhou: Email ou senha incorretos')
      } else {
        console.error('Login failed:', error)
        alert(
          error.message ||
            'Ocorreu um erro durante o login. Por favor, tente novamente.'
        )
      }
    },
  })
}
