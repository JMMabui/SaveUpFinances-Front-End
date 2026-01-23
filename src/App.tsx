import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './components/AuthProvider'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AccountsPage } from './pages/Accounts/AccountsPage'
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/register'
import { BudgetManagement } from './pages/Budget/BudgetManagement'
import { CategoryManagement } from './pages/Category/CategoryManagement'
import { CreditCardManagement } from './pages/Creadit Card/CreditCardManagement'
import { DebtManagement } from './pages/Debt/DebtManagement'
import { Dashboard } from './pages/dashboard'
import { ExpensesManagement } from './pages/Expenses/ExpensesManagement'
import { IncomeSourceManagement } from './pages/Income Source/IncomeSourceManagement'
import { InvestmentTracking } from './pages/Investiment/InvestmentTracking'
import { ReportsDashboard } from './pages/Report/ReportsDashboard'
import { ToastProvider } from '@/components/ui/toast'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/categories"
        element={
          <ProtectedRoute>
            <CategoryManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/budgets"
        element={
          <ProtectedRoute>
            <BudgetManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/credit-cards"
        element={
          <ProtectedRoute>
            <CreditCardManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/income-sources"
        element={
          <ProtectedRoute>
            <IncomeSourceManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/accounts"
        element={
          <ProtectedRoute>
            <AccountsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/investments"
        element={
          <ProtectedRoute>
            <InvestmentTracking />
          </ProtectedRoute>
        }
      />
      <Route
        path="/debts"
        element={
          <ProtectedRoute>
            <DebtManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/expenses"
        element={
          <ProtectedRoute>
            <ExpensesManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <ReportsDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}
