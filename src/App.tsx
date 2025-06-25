import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom'
import { Dashboard } from './pages/dashboard'
import { LoginPage } from './pages/LoginPage'
import { CategoryManagement } from './pages/Category/CategoryManagement'
import { BudgetManagement } from './pages/Budget/BudgetManagement'
import { CreditCardManagement } from './pages/Creadit Card/CreditCardManagement'
import { IncomeSourceManagement } from './pages/Income Source/IncomeSourceManagement'
import { InvestmentTracking } from './pages/Investiment/InvestmentTracking'
import { ReportsDashboard } from './pages/Report/ReportsDashboard'
import { useState } from 'react'
import { DebtManagement } from './pages/Debt/DebtManagement'

function AppRoutes() {
  const [userId, setUserId] = useState<number | null>(null)
  const navigate = useNavigate()

  const handleLogin = (id: number) => {
    setUserId(id)
    navigate('/dashboard')
  }
  const handleLogout = () => {
    setUserId(null)
    navigate('/login')
  }

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!userId) return <Navigate to="/login" />
    return <>{children}</>
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard userId={userId!} onLogout={handleLogout} />
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
        element={<Navigate to={userId ? '/dashboard' : '/login'} />}
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
