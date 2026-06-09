import { useEffect, useState } from "react";
import { getTransactions } from "../services/api";

const RecentTransactions = ({ refreshKey = 0 }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const data = await getTransactions();
        setTransactions(data);
        setError(null);
      } catch {
        setError("Failed to load transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [refreshKey]);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  const formatDate = (dateObj) => {
    if (dateObj instanceof Date && !isNaN(dateObj)) {
      return dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
    return "Invalid Date";
  };

  if (loading) return <div className="card">Loading transactions...</div>;
  if (error) return <div className="card error-text">{error}</div>;

  return (
    <div className="card">
      <h3 className="section-title">Recent Transactions</h3>
      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <ul className="transaction-list">
          {transactions.slice(0, 8).map((tx) => (
            <li key={tx.id} className="transaction-item">
              <div>
                <strong>{tx.description || "No Description"}</strong>
                <div className="muted-text">
                  {tx.category_name ? `${tx.category_name} · ` : ""}
                  {formatDate(
                    tx.transaction_date ? new Date(tx.transaction_date) : null,
                  )}
                </div>
              </div>
              <span className="transaction-amount">
                {formatCurrency(tx.amount)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentTransactions;
