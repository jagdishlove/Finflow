import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({
    username: 'user',
    password: 'user',
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const result = login(form.username, form.password)

    if (result.success) {
      navigate('/app')
    } else {
      setError(result.message || 'Login failed.')
    }
  }

  return (
    <div className="login-v2-shell">
      <div className="login-v2-left">
        <div className="login-v2-brand">
          <div className="public-brand-mark-v3">F</div>
          <span>FinFlow</span>
        </div>

        <div className="login-v2-copy">
          <span className="pill-v3">DEMO ACCESS</span>
          <h1>Access the FinFlow workspace.</h1>
          <p>
            Sign in to explore the premium demo environment and review the product flow,
            dashboard structure, budgets, reports, and financial operations experience.
          </p>

          <div className="login-v2-points">
            <span>Budget visibility</span>
            <span>Transaction control</span>
            <span>Financial reporting</span>
          </div>
        </div>
      </div>

      <div className="login-v2-right">
        <div className="login-v2-card">
          <h2>Sign in</h2>
          <p>Use the demo credentials below to enter the product.</p>

          <form className="auth-form-v2" onSubmit={handleSubmit}>
            <label className="form-field-v2">
              <span>Username</span>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </label>

            <label className="form-field-v2">
              <span>Password</span>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </label>

            <button className="cta-button-v3 login-button-v2" type="submit">
              Enter demo
            </button>
          </form>

          {error ? <p className="error-text login-error-v2">{error}</p> : null}

          <div className="demo-box-v2">
            <p><strong>Demo credentials</strong></p>
            <p>User: <code>user</code></p>
            <p>Password: <code>user</code></p>
          </div>

          <button className="back-link-v2" onClick={() => navigate('/')}>
            Back to landing
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
