
import { useForm } from 'react-hook-form';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Title } from '@/components/ui/title';
import { Paragraph } from '@/components/ui/paragraph';
import logo from '../../assets/logo principal de save up finances.png';
import z from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '@/hooks/auth';




const createAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

type Form = z.infer<typeof createAuthSchema>;

export function LoginPage() {  

  const {mutateAsync: createAuth, isPending} = useLogin()


  const Form = useForm({
    resolver: zodResolver(createAuthSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  


 async function handleSubmit({ email, password }: Form) {
  try {
    await createAuth({ email, password });
    Form.reset();
  } catch (error) {
    console.error("Erro no login:", error);
  }
}

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <img src={logo} alt="Logo SaveUpFinances" className="mx-auto h-12 w-auto" />
          <Title level={1} className="text-green-600">
            SaveUpFinances
          </Title>
          <Paragraph size="lg" className="mt-2 text-gray-600">
            Entre na sua conta
          </Paragraph>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={Form.handleSubmit(handleSubmit)} className="space-y-6">
            <div>
              <Input
                label="Email"
                type="email"
                {...Form.register('email')}
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <Input
                label="Senha"
                type="password"
                {...Form.register('password')}  
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Lembrar-me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-green-600 hover:text-green-500">
                  Esqueceu sua senha?
                </a>
              </div>
            </div>

            <div>
              <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  className="w-full"
                  disabled={isPending}
              >
                {isPending ? 'Entrando...' : 'Entrar'}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Ou continue com</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => {/* TODO: Implementar login com Google */}}
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => {/* TODO: Implementar login com Facebook */}}
              >
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
                Facebook
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Paragraph size="sm" className="text-gray-600">
              Não tem uma conta?{' '}
              <a href="/register" className="font-medium text-green-600 hover:text-green-500">
                Registre-se
              </a>
            </Paragraph>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <Badge variant="info" size="sm">
            Versão 1.0.0
          </Badge>
        </div>
      </div>
    </div>
  );
}; 