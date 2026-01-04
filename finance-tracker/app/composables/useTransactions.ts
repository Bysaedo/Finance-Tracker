import { ref } from "vue";
import { useSupabaseClient } from "~/composables/useSupabaseClient";
import { useAuthUser } from "~/composables/useAuthUser";
import { id } from "@nuxt/ui/runtime/locale/index.js";

export interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  type: "income" | "expense";
  category: string | null;
  description: string | null;
  date: string;
  created_at: string;
}

export const useTransactions = () => {
  const supabase = useSupabaseClient();
  const { user } = useAuthUser();

  const transactions = ref<Transaction[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchTransactions = async () => {
    if (!user.value) return;

    loading.value = true;
    error.value = null;

    const { data, error: err } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.value.id)
      .order("date", { ascending: false });

    if (err) {
      error.value = err.message;
      loading.value = false;
      return;
    }

    transactions.value = (data || []) as Transaction[];
    loading.value = false;
  };

  const addTransaction = async (payload: {
    amount: number;
    type: "income" | "expense";
    category?: string;
    description?: string;
    date: string;
  }) => {
    if (!user.value) {
      throw new Error("You must be logged in to add a transaction.");
    }

    const { amount, type, category, description, date } = payload;
    const { data, error: err } = await supabase
      .from("transactions")
      .insert({
        user_id: user.value.id,
        amount,
        type,
        category: category || null,
        description: description || null,
        date: date || new Date().toISOString(),
      })
      .select()
      .single();
    if (err) throw err;

    transactions.value = [data as Transaction, ...transactions.value];
  };

  const updateTransaction = async (
    id: string,
    updates: Partial<Omit<Transaction, "id" | "user_id" | "created_at">>
  ) => {
    const { error: err } = await supabase
      .from("transactions")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (err) throw err;

    const idx = transactions.value.findIndex((t) => t.id === id);
    if (idx !== -1 && data) {
      transactions.value[idx] = data as Transaction;
    }
  };

  const deleteTransaction = async (id: string) => {
    const { error: err } = await supabase
      .from("transactions")
      .delete()
      .eq("id", id);

    if (err) throw err;
    transactions.value = transactions.value.filter((t) => t.id !== id);
  };
  return {
    transactions,
    loading,
    error,
    fetchTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
};
