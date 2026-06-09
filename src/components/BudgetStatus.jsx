import { useEffect, useState } from "react";
import { getBudgetStatus } from "../services/api";

const BudgetStatus = () => {
  const [budgets, setBudgets] = useState([]);
  console.log("BudgetStatus component rendered", budgets); // Debugging line to check component rendering
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        setLoading(true);
        const data = await getBudgetStatus();
        setBudgets(data);
        setError(null);
      } catch {
        setError("Failed to load budget status.");
      } finally {
        setLoading(false);
      }
    };

    fetchBudgets();
  }, []);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  const getBudgetState = (percentage) => {
    if (percentage > 100) return "over";
    if (percentage >= 80) return "warning";
    return "normal";
  };

  const getBudgetLabel = (percentage) => {
    if (percentage > 100) return "Over budget";
    if (percentage >= 80) return "Near limit";
    return "Healthy";
  };

  if (loading) return <div className="card">Loading budget status...</div>;
  if (error) return <div className="card error-text">{error}</div>;

  return (
    <div className="card">
      <h3 className="section-title">Budget Status</h3>
      {budgets.length === 0 ? (
        <p>No budgets created yet.</p>
      ) : (
        <ul className="budget-list">
          {budgets?.map((item) => {
            const state = getBudgetState(item.remaining);
            const barWidth = `${Math.min(item.remaining, 100)}%`;

            return (
              <li key={item.category_id} className="budget-item">
                <div className="budget-top">
                  <strong>{item.category_name}</strong>
                  <span className={`budget-pill ${state}`}>
                    {getBudgetLabel(item.remaining)}
                  </span>
                </div>

                <div className="budget-meta">
                  <span>Spent: {formatCurrency(item.total_spent)}</span>
                  <span>Limit: {formatCurrency(item.budget_limit)}</span>
                </div>

                <div className="budget-bar">
                  <div
                    className={`budget-bar-fill ${state}`}
                    style={{ width: barWidth }}
                  />
                </div>

                <div className="budget-meta">
                  <span>Remaining: {formatCurrency(item.remaining)}</span>
                  {/* <span className={`budget-text ${state}`}>
                    {item?.remaining.toFixed(2)}%
                  </span> */}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default BudgetStatus;
