import { useEffect, useState } from 'react'
import { getCategories } from '../services/api'

const CategoriesList = ({ refreshKey = 0 }) => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const data = await getCategories()
        setCategories(data)
        setError(null)
      } catch {
        setError('Failed to load categories.')
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [refreshKey])

  if (loading) return <div className="card">Loading categories...</div>
  if (error) return <div className="card error-text">{error}</div>

  return (
    <div className="card">
      <h3 className="section-title">Categories</h3>

      {categories.length === 0 ? (
        <p>No categories yet.</p>
      ) : (
        <ul className="transaction-list">
          {categories.map((cat) => (
            <li key={cat.id} className="transaction-item">
              <div>
                <strong>{cat.name}</strong>
                <div className="muted-text">Category ID: {cat.id}</div>
              </div>
              <span className={cat.type === 'income' ? 'budget-normal' : 'budget-over'}>
                {cat.type}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CategoriesList
