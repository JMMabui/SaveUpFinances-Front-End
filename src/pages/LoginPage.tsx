import { useState } from 'react';
import { Button } from '../components/Button';

const users = [
  { id: 1, name: 'João', email: 'joao@email.com', password: '1234' },
  { id: 2, name: 'Maria', email: 'maria@email.com', password: 'abcd' },
  { id: 3, name: 'Carlos', email: 'carlos@email.com', password: 'senha' },
];

export function LoginPage({ onLogin }: { onLogin: (userId: number) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      onLogin(user.id);
    } else {
      setError('Email ou senha inválidos');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow flex flex-col gap-4 min-w-[320px]">
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800 dark:text-gray-100">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="rounded px-3 py-2 border border-gray-300 dark:bg-gray-700 dark:text-gray-100"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="rounded px-3 py-2 border border-gray-300 dark:bg-gray-700 dark:text-gray-100"
          required
        />
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        <Button type="submit" variant="primary">Entrar</Button>
      </form>
    </div>
  );
} 