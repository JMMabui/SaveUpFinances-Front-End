import { useCreditCardExpensesGetCreditCardExpensesCreditCardByCreditCardId } from "@/lib/HTTP/credit-card-expenses"

export function CreditCardExpensesList({ creditCardId }: { creditCardId: string }) {
    const { data: cardExpenses } = useCreditCardExpensesGetCreditCardExpensesCreditCardByCreditCardId({ creditCardId })

    console.log("Credit Expenses", cardExpenses);

    return (
        <div className="space-y-2">
            {cardExpenses?.data?.map((expense) => (
                <div key={expense.id} className="flex justify-between">
                    <span>{expense.description}</span>
                    <span>{expense.amount}</span>
                </div>
            ))}
        </div>
    )
}