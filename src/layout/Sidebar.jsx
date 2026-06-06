import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const links = [
    { to: '/app', label: 'Overview' },
    { to: '/app/transactions', label: 'Transactions' },
    { to: '/app/budgets', label: 'Budgets' },
    { to: '/app/categories', label: 'Categories' },
    { to: '/app/reports', label: 'Reports' },
    { to: '/app/settings', label: 'Settings' },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>FinFlow</h2>
        <p>Small business finance</p>
      </div>

      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/app'}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
