import { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  getSummary,
  getTransactions,
  getExpensesByCategory,
} from "../services/api";

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
];

const ReportsPage = () => {
  const [summary, setSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [summaryData, transactionData, expensesData] = await Promise.all([
          getSummary(),
          getTransactions(),
          getExpensesByCategory(),
        ]);

        setSummary(summaryData);
        setTransactions(transactionData);
        setExpenses(expensesData);
        setError(null);
      } catch {
        setError("Failed to load reports data.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(value);

  const monthlyChartData = useMemo(() => {
    const monthMap = {};

    transactions.forEach((tx) => {
      const date = new Date(tx.transaction_date);
      if (isNaN(date.getTime())) return; // Skip invalid dates

      const monthKey = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });

      if (!monthMap[monthKey]) {
        monthMap[monthKey] = { month: monthKey, income: 0, expenses: 0 };
      }

      if (tx.type === "expense") {
        monthMap[monthKey].expenses += tx.amount;
      } else if (tx.type === "income") {
        monthMap[monthKey].income += tx.amount;
      }
    });

    return Object.values(monthMap).sort(
      (a, b) => new Date(a.month) - new Date(b.month),
    );
  }, [transactions]);

  console.log("monthlyChartData:", monthlyChartData);

  if (loading) return <div className="card">Loading reports...</div>;
  if (error) return <div className="card error-text">{error}</div>;

  return (
    <div className="page-stack">
      <div className="card">
        <h2 className="section-title">Reports</h2>
        <p className="muted-text">
          Track financial performance with visual reports and summary metrics.
        </p>
      </div>

      {summary ? (
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
      ) : null}

      <div className="reports-grid">
        <div className="card chart-card">
          <h3 className="section-title">Income vs Expenses</h3>
          {monthlyChartData.length === 0 ? (
            <p>No data available.</p>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={monthlyChartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.08)"
                />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{
                    background: "#0f172a",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    color: "#f3f4f6",
                  }}
                />
                <Legend />
                <Bar dataKey="income" fill="#10b981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="expenses" fill="#ef4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="card chart-card">
          <h3 className="section-title">Expenses by Category</h3>
          {expenses.length === 0 ? (
            <p>No expense data available.</p>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={expenses}
                  dataKey="total_expenses"
                  nameKey="category_name"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  label={({ category_name }) => category_name}
                >
                  {expenses.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{
                    background: "#0f172a",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    color: "#f3f4f6",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
