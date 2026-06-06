import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

const Topbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout } = useAuth()

  const getPrimaryAction = () => {
    if (location.pathname === '/app/budgets') {
      return { label: 'New Budget', action: () => navigate('/app/budgets') }
    }

    if (location.pathname === '/app/categories') {
      return { label: 'New Category', action: () => navigate('/app/categories') }
    }

    return { label: 'New Transaction', action: () => navigate('/app') }
  }

  const primaryAction = getPrimaryAction()

  return (
    <header className="topbar card">
      <div>
        <div className="workspace-row">
          <span className="workspace-badge">Demo Workspace</span>
        </div>
        <h1 className="topbar-title">FinFlow Dashboard</h1>
        <p className="topbar-subtitle">
          Financial operations dashboard for small businesses
        </p>
      </div>

      <div className="topbar-actions">
        <button className="secondary-button" onClick={() => navigate('/app/reports')}>
          View Reports
        </button>
        <button className="secondary-button" onClick={() => navigate('/app/categories')}>
          New Category
        </button>
        <button className="secondary-button" onClick={() => navigate('/app/budgets')}>
          New Budget
        </button>
        <button className="primary-button" onClick={primaryAction.action}>
          {primaryAction.label}
        </button>
        <button
          className="secondary-button"
          onClick={() => {
            logout()
            navigate('/login')
          }}
        >
          Logout
        </button>
      </div>
    </header>
  )
}

export default Topbar
