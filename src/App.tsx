import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { Dashboard } from './pages/dashboard'
import { LoginPage } from './pages/LoginPage'
import { CategoryManagement } from './pages/Category/CategoryManagement'
import { BudgetManagement } from './pages/Budget/BudgetManagement'
import { CreditCardManagement } from './pages/Creadit Card/CreditCardManagement'
import { IncomeSourceManagement } from './pages/Income Source/IncomeSourceManagement'
import { InvestmentTracking } from './pages/Investiment/InvestmentTracking'
import { ReportsDashboard } from './pages/Report/ReportsDashboard'
import { DebtManagement } from './pages/Debt/DebtManagement'
import { AccountsPage } from './pages/Accounts/AccountsPage'
import { RegisterPage } from './pages/register'

function AppRoutes() {

  const token = localStorage.getItem('token')

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!token) return <Navigate to="/login" />
    return <>{children}</>
  }

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
      <Route path="/debts" element={<ProtectedRoute> <DebtManagement/> </ProtectedRoute>}/>
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <ReportsDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={<Navigate to={token ? '/dashboard' : '/login'} />}
      />
    </Routes>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
