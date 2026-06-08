import { useEffect, useState } from "react";
import { getSummary } from "../services/api";

const SummaryCards = () => {
  const [summary, setSummary] = useState({
    total_income: 0,
    total_expenses: 0,
    net_balance: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const data = await getSummary();
        setSummary(data);
        setError(null);
      } catch {
        setError("Failed to load summary data.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  if (loading) return <div className="card">Loading summary...</div>;
  if (error) return <div className="card error-text">{error}</div>;

  return (
    <div className="summary-grid">
      <div className="card summary-card">
        <p className="summary-label">Total Income</p>
        <h2 className="summary-value income">
          {formatCurrency(summary[0].total_income)}
        </h2>
      </div>
      <div className="card summary-card">
        <p className="summary-label">Total Expenses</p>
        <h2 className="summary-value expense">
          {formatCurrency(summary[0].total_expenses)}
        </h2>
      </div>
      <div className="card summary-card">
        <p className="summary-label">Net Balance</p>
        <h2 className="summary-value balance">
          {formatCurrency(summary[0].net_balance)}
        </h2>
      </div>
    </div>
  );
};

export default SummaryCards;
