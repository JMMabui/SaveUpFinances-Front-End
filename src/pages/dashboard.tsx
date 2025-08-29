
import { Header } from '../components/Header'
import { FinancesResume } from './finances_resume'
import { QuickStats } from '../components/QuickStats'
import { ExpenseChart } from '../components/ExpenseChart'
import { FinancialGoals } from '../components/FinancialGoals'
import { RecentTransactions } from '../components/RecentTransactions'
import { FinancialAlerts } from '../components/FinancialAlerts'
import { MonthlySummary } from '../components/MonthlySummary'

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Header />

      {/* Resumo financeiro usando Cards */}
      <main className="px-6 space-y-6">
        
        {/* Estatísticas rápidas */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Visão Geral</h2>
          <QuickStats />
        </section>

        {/* Grid principal do dashboard */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna esquerda - Gráficos e Metas */}
          <div className="lg:col-span-2 space-y-6">
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
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Análise Mensal</h2>
          <MonthlySummary />
        </section>
      </main>
    </div>
  )
}
