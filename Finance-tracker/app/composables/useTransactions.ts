//"Brain" of the app data layer. Manages fetching and manipulating transaction data.
export function useTransactions() {
  const { $supabase } = useNuxtApp(); // Access Supabase client
  const { user } = useAuth(); // Access authenticated user

  //These update automatically in the UI when changed
  const transactions = ref<any[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Filters for querying transactions
  const filters = reactive({
    type: "all",
    category: "all",
    fromDate: null as string | null,
    toDate: null as string | null,
    sortBy: "date-desc",
  });

  const fetchTransactions = async () => {
    if (!user.value) return; //Ensure user is logged in
    loading.value = true;
    error.value = null;

    //Build and execute a supabase query to fetch transactions based on filters
    let query = $supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.value?.id);

    //Dynamically filters. These conditions modify the query based on user-selected filters
    if (filters.type !== "all") {
      query = query.eq("type", filters.type);
    }
    if (filters.category !== "all") {
      query = query.eq("category", filters.category);
    }
    if (filters.fromDate) {
      query = query.gte("date", filters.fromDate);
    }
    if (filters.toDate) {
      query = query.lte("date", filters.toDate);
    }

    //Sorting logic
    if (filters.sortBy === "date-desc") {
      query = query.order("date", { ascending: false });
    } else if (filters.sortBy === "date-asc") {
      query = query.order("date", { ascending: true });
    } else if (filters.sortBy === "amount-desc") {
      query = query.order("amount", { ascending: false });
    } else if (filters.sortBy === "amount-asc") {
      query = query.order("amount", { ascending: true });
    }

    //Execute the query
    const { data, error: qError } = await query;
    //Handle response
    if (qError) {
      error.value = qError.message;
      transactions.value = [];
    } else {
      transactions.value = data || [];
    }
    loading.value = false;
  };
  //Adds a new transaction, associating it with the logged-in user
  const addTransaction = async (payload) => {
    if (!user.value) throw new Error("User not authenticated");

    const { error: insertError } = await $supabase.from("transactions").insert([
      {
        ...payload,
        user_id: user.value.id,
      },
    ]);
    if (insertError) {
      throw insertError;
    }
  };

  //Updates the transaction list after adding a new one
  const updateTransactions = async (id, payload) => {
    if (!user.value) throw new Error("User not authenticated");

    const { error: updateError } = await $supabase
      .from("transactions")
      .update(payload)
      .eq("id", Id)
      .eq("user_id", user.value.id);
    if (updateError) {
      throw updateError;
    }
  };

  //Deletes a transaction by its ID, ensuring it belongs to the logged-in user
  const deleteTransaction = async (id) => {
    if (!user.value) throw new Error("User not authenticated");
    const { error: delError } = await $supabase
      .from("transactions")
      .delete()
      .eq("id", id)
      .eq("user_id", user.value.id);
    if (delError) {
      throw delError;
    }
  };
  //Summary calculations, whenever transactions change, these values recalculate automatically
  const totalIncome = computed(() =>
    transactions.value
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0)
  );
  const totalExpense = computed(() =>
    transactions.value
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0)
  );
  const netBalance = computed(() => totalIncome.value - totalExpense.value);
  return {
    transactions,
    filters,
    loading,
    error,
    fetchTransactions,
    totalIncome,
    totalExpense,
    netBalance,
  };
}
