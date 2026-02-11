import { useCreditCardExpensesGetByCreditCard } from '@/lib/HTTP/credit-card-expenses'
import type { CreditCardExpensesGetByCreditCardResponse } from '@/lib/HTTP/Type/credit-card-expenses.type'
import { formatCurrency } from '@/lib/utils'

export function CreditCardExpensesList({
  creditCardId,
}: {
  creditCardId: string
}) {
  const { data: cardExpenses } = useCreditCardExpensesGetByCreditCard({
    creditCardId,
  })

  console.log('Credit Expenses', cardExpenses)

  return (
    <div className="space-y-2">
      {cardExpenses?.data?.map(
        (
          expense: CreditCardExpensesGetByCreditCardResponse['data'][number]
        ) => (
          <div key={expense.id} className="flex justify-between">
            <span>{expense.description}</span>
            <span>
              {formatCurrency(
                typeof expense.amount === 'number'
                  ? expense.amount
                  : Number((expense as any).amount || 0)
              )}
            </span>
          </div>
        )
      )}
    </div>
  )
}
