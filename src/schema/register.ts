import z from 'zod'

const mozPhoneRegex = /^(\+258|00258)?8[2-7][0-9]{7}$/

export const createRegistrationSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: 'Nome deve conter no mínimo 2 caracteres' }),
    surname: z
      .string()
      .min(2, { message: 'Sobrenome deve conter no mínimo 2 caracteres' }),
    email: z.string().email({ message: 'Email inválido' }),
    contact: z.string().regex(mozPhoneRegex, {
      message: 'Número de telefone moçambicano inválido',
    }),
    password: z
      .string()
      .min(6, { message: 'Senha deve conter no mínimo 6 caracteres' }),
    confirmPassword: z.string().min(6, {
      message: 'Confirmação de senha deve conter no mínimo 6 caracteres',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })
