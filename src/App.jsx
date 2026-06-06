import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import ProtectedRoute from './auth/ProtectedRoute'
import Sidebar from './layout/Sidebar'
import Topbar from './layout/Topbar'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import OverviewPage from './pages/OverviewPage'
import TransactionsPage from './pages/TransactionsPage'
import BudgetsPage from './pages/BudgetsPage'
import CategoriesPage from './pages/CategoriesPage'
import ReportsPage from './pages/ReportsPage'
import SettingsPage from './pages/SettingsPage'
import './index.css'

const AppLayout = () => {
  return (
    <div className="saas-layout">
      <Sidebar />
      <main className="main-panel">
        <Topbar />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/budgets" element={<BudgetsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/app/*"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
