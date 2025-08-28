import  { useState } from 'react';
import { Debt } from '../../types/Debt';
import { DebtList } from './DebtList';
import { DebtForm } from './DebtForm';
import { DebtPaymentForm } from './DebtPaymentForm';
import { TopNavigation } from '../../components/TopNavigation';
import { mockDebts } from '../../mocks/mockData';
import { Header } from '@/components/Header';

export function DebtManagement() {
  const [debts, setDebts] = useState<Debt[]>(mockDebts); // Inicialmente vazio, pode ser mockado
  const [editingDebt, setEditingDebt] = useState<Debt | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [payingDebt, setPayingDebt] = useState<Debt | null>(null);

  function handleAdd() {
    setEditingDebt(null);
    setShowForm(true);
  }

  function handleEdit(debt: Debt) {
    setEditingDebt(debt);
    setShowForm(true);
  }

  function handleSave(debt: Debt) {
    setDebts(prev => {
      const exists = prev.find(d => d.id === debt.id);
      if (exists) {
        return prev.map(d => d.id === debt.id ? debt : d);
      }
      return [...prev, debt];
    });
    setShowForm(false);
  }

  function handlePay(debtId: string) {
    const debt = debts.find(d => d.id === debtId);
    if (debt) setPayingDebt(debt);
  }

  function handleSavePayment(data: { valorPago: number; dataPagamento: string; observacoes?: string }) {
    setDebts(prev => prev.map(d => {
      if (payingDebt && d.id === payingDebt.id) {
        // Se valor pago >= valor da dívida, marca como paga
        if (data.valorPago >= d.valor) {
          return { ...d, status: 'paga', dataPagamento: data.dataPagamento, observacoes: data.observacoes };
        } else {
          // Se for pagamento parcial, subtrai do valor e mantém pendente
          return { ...d, valor: d.valor - data.valorPago, observacoes: data.observacoes };
        }
      }
      return d;
    }));
    setPayingDebt(null);
  }

  function handleCancelPayment() {
    setPayingDebt(null);
  }

  function handleCancel() {
    setShowForm(false);
  }

  return (
    <div>
      <Header />
      {showForm ? (
        <DebtForm initialDebt={editingDebt!} onSave={handleSave} onCancel={handleCancel} />
      ) : payingDebt ? (
        <DebtPaymentForm valorOriginal={payingDebt.valor} onSave={handleSavePayment} onCancel={handleCancelPayment} />
      ) : (
        <DebtList debts={debts} onAdd={handleAdd} onEdit={handleEdit} onPay={handlePay} />
      )}
    </div>
  );
};
