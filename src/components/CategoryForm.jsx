import { useState } from "react";
import { createCategory } from "../services/api";

const CategoryForm = ({ onCreated }) => {
  const [form, setForm] = useState({
    name: "",
    type: "expense",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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
      await createCategory(form);
      setMessage("Category created successfully.");
      setForm({
        name: "",
        type: "expense",
        user_id: null,
      });
      if (onCreated) onCreated();
    } catch {
      setError("Failed to create category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3 className="section-title">Create category</h3>

      <form className="form-grid" onSubmit={handleSubmit}>
        <label className="form-field">
          <span>Name</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Office Rent"
            required
          />
        </label>

        <label className="form-field">
          <span>Type</span>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
          >
            <option value="expense">expense</option>
            <option value="income">income</option>
          </select>
        </label>

        <button className="primary-button" type="submit" disabled={loading}>
          {loading ? "Saving..." : "Create category"}
        </button>
      </form>

      {message ? <p className="success-text">{message}</p> : null}
      {error ? <p className="error-text">{error}</p> : null}
    </div>
  );
};

export default CategoryForm;
