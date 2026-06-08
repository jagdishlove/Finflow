import { useEffect, useState } from "react";
import { getExpensesByCategory } from "../services/api";

const ExpensesByCategory = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        const data = await getExpensesByCategory();
        setExpenses(data);
        setError(null);
      } catch {
        setError("Failed to load expenses by category.");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  if (loading)
    return <div className="card">Loading expenses by category...</div>;
  if (error) return <div className="card error-text">{error}</div>;

  return (
    <div className="card">
      <h3 className="section-title">Expenses by Category</h3>
      {expenses.length === 0 ? (
        <p>No expenses recorded yet.</p>
      ) : (
        <ul className="expense-list">
          {expenses.map((item) => (
            <li key={item.category_name} className="expense-item">
              <span>{item.category_name}</span>
              <span className="transaction-amount">
                {formatCurrency(item.total_expenses)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpensesByCategory;
