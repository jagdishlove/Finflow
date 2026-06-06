import { useEffect, useState } from 'react'
import { getCategories, createBudget } from '../services/api'

const BudgetForm = ({ onCreated }) => {
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState({
    category_id: '',
    monthly_limit: '',
  })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setFetching(true)
        const data = await getCategories()
        setCategories(data.filter((cat) => cat.type === 'expense'))
      } catch {
        setError('Failed to load categories.')
      } finally {
        setFetching(false)
      }
    }

    loadCategories()
  }, [])

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      await createBudget({
        category_id: Number(form.category_id),
        monthly_limit: form.monthly_limit,
      })

      setMessage('Budget created successfully.')
      setForm({
        category_id: '',
        monthly_limit: '',
      })

      if (onCreated) onCreated()
    } catch {
      setError('Failed to create budget.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <h3 className="section-title">Create budget</h3>

      {fetching ? (
        <p className="muted-text">Loading expense categories...</p>
      ) : (
        <form className="form-grid" onSubmit={handleSubmit}>
          <label className="form-field">
            <span>Expense Category</span>
            <select name="category_id" value={form.category_id} onChange={handleChange} required>
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>

          <label className="form-field">
            <span>Monthly Limit</span>
            <input
              type="number"
              step="0.01"
              min="0.01"
              name="monthly_limit"
              value={form.monthly_limit}
              onChange={handleChange}
              placeholder="0.00"
              required
            />
          </label>

          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Create budget'}
          </button>
        </form>
      )}

      {message ? <p className="success-text">{message}</p> : null}
      {error ? <p className="error-text">{error}</p> : null}
    </div>
  )
}

export default BudgetForm
