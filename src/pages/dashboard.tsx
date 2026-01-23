import { CashFlowChart } from '../components/CashFlowChart'
import { ExpenseChart } from '../components/ExpenseChart'
import { FinancialAlerts } from '../components/FinancialAlerts'
import { FinancialGoals } from '../components/FinancialGoals'
import { MainLayout } from '../components/layout/mainLayout'
import { MonthlySummary } from '../components/MonthlySummary'
import { QuickStats } from '../components/QuickStats'
import { RecentTransactions } from '../components/RecentTransactions'

export function Dashboard() {
  return (
    <MainLayout>
      {/* Resumo financeiro usando Cards */}
      <main className="px-6 space-y-6">
        {/* Estatísticas rápidas */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Visão Geral
          </h2>
          <QuickStats />
        </section>

        {/* Grid principal do dashboard */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna esquerda - Gráficos e Metas */}
          <div className="lg:col-span-2 space-y-6">
            {/* Fluxo de caixa */}
            <CashFlowChart />
            {/* Gráfico de despesas */}
            <ExpenseChart />

            {/* Metas financeiras */}
            <FinancialGoals />
          </div>

          {/* Coluna direita - Transações e Alertas */}
          <div className="space-y-6">
            {/* Transações recentes */}
            <RecentTransactions />

            {/* Alertas financeiros */}
            <FinancialAlerts />
          </div>
        </section>

        {/* Resumo mensal em largura total */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Análise Mensal
          </h2>
          <MonthlySummary />
        </section>
      </main>
    </MainLayout>
  )
}
