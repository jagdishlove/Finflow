import { useState } from 'react'
import BudgetStatus from '../components/BudgetStatus'
import BudgetForm from '../components/BudgetForm'

const BudgetsPage = () => {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div className="page-stack">
      <div className="card">
        <h2 className="section-title">Budgets</h2>
        <p className="muted-text">
          Set monthly spending limits and monitor performance by category.
        </p>
      </div>

      <BudgetForm onCreated={handleRefresh} />
      <BudgetStatus key={`budgets-${refreshKey}`} />
    </div>
  )
}

export default BudgetsPage
