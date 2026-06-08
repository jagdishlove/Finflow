import { useEffect, useState } from "react";
import { getCategories, createTransaction } from "../services/api";
import { supabase } from "../supabase/client";

const TransactionForm = ({ onCreated }) => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    category_id: "",
    description: "",
    amount: "",
    transaction_date: new Date().toISOString().slice(0, 10),
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setFetching(true);
        const data = await getCategories();
        setCategories(data);
      } catch {
        setError("Failed to load categories.");
      } finally {
        setFetching(false);
      }
    };

    loadCategories();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const selectedCategory = categories.find(
        (cat) => cat.id === form.category_id,
      );
      if (!selectedCategory) throw new Error("Category not found");

      await createTransaction({
        ...form,
        user_id: user.id,
        type: selectedCategory.type,
      });

      setMessage("Transaction created successfully.");
      setForm((prev) => ({
        ...prev,
        description: "",
        amount: "",
      }));

      if (onCreated) onCreated();
    } catch {
      setError("Failed to create transaction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3 className="section-title">Create transaction</h3>

      {fetching ? (
        <p className="muted-text">Loading categories...</p>
      ) : (
        <form className="form-grid" onSubmit={handleSubmit}>
          <label className="form-field">
            <span>Category</span>
            <select
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} ({cat.type})
                </option>
              ))}
            </select>
          </label>

          <label className="form-field">
            <span>Description</span>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Monthly office rent"
              required
            />
          </label>

          <label className="form-field">
            <span>Amount</span>
            <input
              type="number"
              step="0.01"
              min="0.01"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="0.00"
              required
            />
          </label>

          <label className="form-field">
            <span>Date</span>
            <input
              type="date"
              name="transaction_date"
              value={form.transaction_date}
              onChange={handleChange}
              required
            />
          </label>

          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? "Saving..." : "Create transaction"}
          </button>
        </form>
      )}

      {message ? <p className="success-text">{message}</p> : null}
      {error ? <p className="error-text">{error}</p> : null}
    </div>
  );
};

export default TransactionForm;
