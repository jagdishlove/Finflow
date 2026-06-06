import RecentTransactions from '../components/RecentTransactions'

const TransactionsPage = () => {
  return (
    <div className="page-stack">
      <div className="card">
        <h2 className="section-title">Transactions</h2>
        <p className="muted-text">
          Review recent financial activity and transaction flow.
        </p>
      </div>
      <RecentTransactions refreshKey={0} />
    </div>
  )
}

export default TransactionsPage
