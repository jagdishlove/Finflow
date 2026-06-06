import { useState } from 'react'
import CategoriesList from '../components/CategoriesList'
import CategoryForm from '../components/CategoryForm'

const CategoriesPage = () => {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div className="page-stack">
      <div className="card">
        <h2 className="section-title">Categories</h2>
        <p className="muted-text">
          Manage income and expense categories for your workspace.
        </p>
      </div>

      <CategoryForm onCreated={handleRefresh} />
      <CategoriesList refreshKey={refreshKey} />
    </div>
  )
}

export default CategoriesPage
