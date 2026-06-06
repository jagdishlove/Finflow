import { supabase } from "../supabase/client";

export const getSummary = async () => {
  const { data, error } = await supabase.rpc("get_summary");

  if (error) {
    console.error("Error fetching summary:", error);
    return { total_income: 0, total_expenses: 0, net_balance: 0 };
  }

  return data;
};

export const getExpensesByCategory = async () => {
  const { data, error } = await supabase.rpc("get_expenses_by_category");

  if (error) {
    console.error("Error fetching expenses by category:", error);
    return [];
  }

  return data;
};

export const getTransactions = async () => {
  const { data, error } = await supabase
    .from("transactions")
    .select("*, categories(name)")
    .order("transaction_date", { ascending: false });

  if (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }

  return data.map((tx) => ({
    ...tx,
    category_name: tx.categories.name,
  }));
};

export const getCategories = async () => {
  const { data, error } = await supabase.from("categories").select("*");

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return data;
};

export const createCategory = async (payload) => {
  const { data, error } = await supabase
    .from("categories")
    .insert(payload)
    .select();

  if (error) {
    console.error("Error creating category:", error);
    return null;
  }

  return data;
};

export const createTransaction = async (payload) => {
  const { data, error } = await supabase
    .from("transactions")
    .insert(payload)
    .select();

  if (error) {
    console.error("Error creating transaction:", error);
    return null;
  }

  return data;
};

export const getBudgetStatus = async () => {
  const { data, error } = await supabase.rpc("get_budget_status");

  if (error) {
    console.error("Error fetching budget status:", error);
    return [];
  }

  return data;
};

export const createBudget = async (payload) => {
  const { data, error } = await supabase
    .from("budgets")
    .insert(payload)
    .select();

  if (error) {
    console.error("Error creating budget:", error);
    return null;
  }

  return data;
};

export default supabase;
