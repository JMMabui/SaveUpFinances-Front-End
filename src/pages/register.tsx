import { useRegister } from "@/hooks/auth";
import { createRegistrationSchema } from "@/schema/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Badge } from '../components/Badge/Badge';
import { Button } from '../components/Button/Button';
import { Card } from '@/components/ui/card'
import { Input } from '../components/Input/Input';
import { Paragraph } from '../components/Typography/Paragraph';
import { Title } from '../components/Typography/Title';
import logo from "@/assets//logo principal de save up finances.png"; 

type Form = z.infer<typeof createRegistrationSchema>;

export function RegisterPage() {
  const { mutateAsync: createRegistration, isPending } = useRegister();

  const Form = useForm<Form>({
    resolver: zodResolver(createRegistrationSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
      contact: "",
    },
  });

  async function handleSubmit(data: Form) {
    try {
      await createRegistration(data);
      Form.reset();
    } catch (error) {
      console.error("Erro no registro:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <img src={logo} alt="Logo SaveUpFinances" className="mx-auto h-12 w-auto" />
          <Title level={1} className="text-green-600">SaveUpFinances</Title>
          <Paragraph size="lg" className="mt-2 text-gray-600">Crie sua conta</Paragraph>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={Form.handleSubmit(handleSubmit)} className="space-y-6">
            <Input label="Nome" {...Form.register("name")} placeholder="Seu nome" required />
            
            <Input label="Sobrenome" {...Form.register("surname")} placeholder="Seu sobrenome" required />
            <Input label="Email" type="email" {...Form.register("email")} placeholder="seu@email.com" required />
            <Input label="Contacto" {...Form.register("contact")} placeholder="+25884xxxxxxx" required />
            {Form.formState.errors.contact && (
                <p className="text-red-500 text-sm mt-1">
                    {Form.formState.errors.contact.message}
                </p>
            )}
            <Input label="Senha" type="password" {...Form.register("password")} placeholder="••••••••" required />
            <Input label="Confirmar Senha" type="password" {...Form.register("confirmPassword")} placeholder="••••••••" required />

            <Button type="submit" variant="primary" size="large" className="w-full" isLoading={isPending}>
              Registrar
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Paragraph size="sm" className="text-gray-600">
              Já tem uma conta?{" "}
              <a href="/login" className="font-medium text-green-600 hover:text-green-500">
                Entrar
              </a>
            </Paragraph>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <Badge variant="info" size="sm">Versão 1.0.0</Badge>
        </div>
      </div>
    </div>
  );
}