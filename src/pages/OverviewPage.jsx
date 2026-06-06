import { useState } from 'react'
import SummaryCards from '../components/SummaryCards'
import RecentTransactions from '../components/RecentTransactions'
import ExpensesByCategory from '../components/ExpensesByCategory'
import BudgetStatus from '../components/BudgetStatus'
import TransactionForm from '../components/TransactionForm'

const OverviewPage = () => {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <>
      <SummaryCards key={`summary-${refreshKey}`} />

      <div className="content-grid">
        <div className="left-column">
          <RecentTransactions refreshKey={refreshKey} />
        </div>
        <div className="right-column">
          <ExpensesByCategory key={`expenses-${refreshKey}`} />
        </div>
      </div>

      <div className="budget-section">
        <BudgetStatus key={`budgets-${refreshKey}`} />
      </div>

      <div className="budget-section">
        <TransactionForm onCreated={handleRefresh} />
      </div>
    </>
  )
}

export default OverviewPage
