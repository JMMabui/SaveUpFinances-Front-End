import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/lib/apiServices';
import type { getAuthRequest } from '@/HTTP/Type/authType';

export function useLogin(redirectTo: string = '/dashboard') {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['auth', 'login'],
    mutationFn: (payload: getAuthRequest) => authService.login(payload),
    onSuccess: (data) => {
      localStorage.setItem('token', data.data.token)
      localStorage.setItem('userId', data.data.user.id)
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      navigate(redirectTo)
    },
    onError: ()=>{
      alert("Invalid email or password")
    }
  });
}

export function useLogout(redirectTo: string = '/login') {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['auth', 'logout'],
    mutationFn: async () => authService.logout(),
    onSuccess: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      queryClient.clear();
      navigate(redirectTo);
    },
  });
}

export function useRegister(redirectTo: string = '/dashboard') {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['auth', 'register'],
    mutationFn: (payload: any) => authService.register(payload),
    onSuccess: (data) => {
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('userId', data.data.user.id);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      navigate(redirectTo);
    },
  });
}

export function useRefreshToken() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['auth', 'refresh'],
    mutationFn: () => authService.refreshToken(),
    onSuccess: (data) => {
      if (data?.data?.token) {
        localStorage.setItem('token', data.data.token);
        queryClient.invalidateQueries();
      }
    },
  });
}

