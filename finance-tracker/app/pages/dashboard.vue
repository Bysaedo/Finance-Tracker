<template>
  <div class="mx-auto max-w-4xl space-y-6">
    <!-- Header -->
    <header
      class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p class="text-sm text-slate-600">Track your income and expenses.</p>
      </div>

      <div class="flex items-center gap-3 text-sm text-slate-600">
        <span v-if="user">Logged in as {{ user.email }}</span>
        <button
          class="rounded-md bg-slate-800 px-3 py-2 text-xs font-medium text-white hover:bg-slate-900"
          @click="logout"
        >
          Log out
        </button>
      </div>
    </header>

    <!-- Add transaction form -->
    <section
      class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm space-y-4"
    >
      <h2 class="text-lg font-semibold">Add transaction</h2>

      <form
        class="grid gap-3 md:grid-cols-2"
        @submit.prevent="handleAddTransaction"
      >
        <div class="space-y-1">
          <label class="block text-sm font-medium text-slate-700">Amount</label>
          <input
            v-model="amountInput"
            type="number"
            step="0.01"
            required
            class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>

        <div class="space-y-1">
          <label class="block text-sm font-medium text-slate-700">Type</label>
          <select
            v-model="typeInput"
            class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div class="space-y-1">
          <label class="block text-sm font-medium text-slate-700"
            >Category</label
          >
          <input
            v-model="categoryInput"
            type="text"
            placeholder="e.g. Groceries, Salary"
            class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>

        <div class="space-y-1">
          <label class="block text-sm font-medium text-slate-700">Date</label>
          <input
            v-model="dateInput"
            type="date"
            class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>

        <div class="md:col-span-2 space-y-1">
          <label class="block text-sm font-medium text-slate-700"
            >Description</label
          >
          <input
            v-model="descriptionInput"
            type="text"
            placeholder="Optional note"
            class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>

        <div class="md:col-span-2 flex justify-end">
          <button
            type="submit"
            :disabled="submitting"
            class="inline-flex items-center rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 disabled:opacity-60"
          >
            <span v-if="submitting">Saving...</span>
            <span v-else>Add transaction</span>
          </button>
        </div>
      </form>

      <p v-if="txError" class="text-sm text-red-600">
        {{ txError }}
      </p>
    </section>

    <!-- Transactions list -->
    <section
      class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm space-y-3"
    >
      <div class="flex items-center justify-between">
        <div
          class="flex flex-col gap-3 rounded-md bg-slate-50 p-3 text-xs text-slate-700 md:flex-row md:items-center md:justify-between md:text-sm"
        >
          <!-- Left side: Filters -->
          <div class="flex flex-wrap gap-3">
            <!-- Type filter -->
            <div class="flex items-center gap-2">
              <span class="font-medium">Type:</span>
              <select
                v-model="filterType"
                class="rounded-md border border-slate-300 px-2 py-1 text-xs shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 md:text-sm"
              >
                <option value="all">All</option>
                <option value="income">Income</option>
                <option value="expense">Expenses</option>
              </select>
            </div>

            <!-- Category filter -->
            <div v-if="categories.length" class="flex items-center gap-2">
              <span class="font-medium">Category:</span>
              <select
                v-model="filterCategory"
                class="rounded-md border border-slate-300 px-2 py-1 text-xs shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 md:text-sm"
              >
                <option value="all">All</option>
                <option v-for="cat in categories" :key="cat" :value="cat">
                  {{ cat }}
                </option>
              </select>
            </div>
          </div>

          <!-- Right side: Sorting -->
          <div class="flex flex-wrap gap-3">
            <div class="flex items-center gap-2">
              <span class="font-medium">Sort by:</span>
              <select
                v-model="sortBy"
                class="rounded-md border border-slate-300 px-2 py-1 text-xs shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 md:text-sm"
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
              </select>
            </div>

            <div class="flex items-center gap-2">
              <span class="font-medium">Direction:</span>
              <select
                v-model="sortDirection"
                class="rounded-md border border-slate-300 px-2 py-1 text-xs shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 md:text-sm"
              >
                <option value="desc">Newest / Highest first</option>
                <option value="asc">Oldest / Lowest first</option>
              </select>
            </div>
          </div>
        </div>

        <h2 class="text-lg font-semibold">Recent transactions</h2>
        <p class="text-sm text-slate-600">
          Total balance:
          <span
            :class="balance >= 0 ? 'text-emerald-600' : 'text-red-600'"
            class="font-semibold"
          >
            {{ balanceFormatted }}
          </span>
        </p>
      </div>

      <div v-if="loading" class="text-sm text-slate-500">Loading...</div>

      <div v-else-if="transactions.length === 0" class="text-sm text-slate-500">
        No transactions yet. Add your first one above.
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full text-left text-sm">
          <thead>
            <tr
              class="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500"
            >
              <th class="px-2 py-2">Date</th>
              <th class="px-2 py-2">Description</th>
              <th class="px-2 py-2">Category</th>
              <th class="px-2 py-2 text-right">Amount</th>
              <th class="px-2 py-2"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="tx in visibleTransactions"
              :key="tx.id"
              class="border-b border-slate-100 last:border-0"
            >
              <td class="px-2 py-2 align-top">
                {{ formatDate(tx.date) }}
              </td>
              <td class="px-2 py-2 align-top">
                <div class="font-medium text-slate-800">
                  {{ tx.description || "No description" }}
                </div>
                <div class="text-xs text-slate-500">
                  {{ tx.type === "income" ? "Income" : "Expense" }}
                </div>
              </td>
              <td class="px-2 py-2 align-top text-slate-700">
                {{ tx.category || "—" }}
              </td>
              <td
                class="px-2 py-2 align-top text-right font-semibold"
                :class="
                  tx.type === 'income' ? 'text-emerald-600' : 'text-red-600'
                "
              >
                {{ tx.type === "income" ? "+" : "-"
                }}{{ formatAmount(tx.amount) }}
              </td>
              <td class="px-2 py-2 align-top text-right">
                <button
                  class="text-xs text-red-600 hover:underline"
                  @click="handleDeleteTransaction(tx.id)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <section class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <TransactionsChart :transactions="transactions" />
    </section>
    <!-- Category breakdown charts -->
    <section class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <ClientOnly>
        <CategoryBreakdownChart :transactions="transactions" />
      </ClientOnly>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useAuthUser } from "~/composables/useAuthUser";
import { useTransactions } from "~/composables/useTransactions";
import TransactionsChart from "~/components/TransactionsChart.vue";
import CategoryBreakdownChart from "~/components/CategoryBreakdownChart.vue";

definePageMeta({
  middleware: "auth",
});

const { user, fetchUser, logout } = useAuthUser();
const {
  transactions,
  loading,
  error,
  fetchTransactions,
  addTransaction,
  deleteTransaction,
} = useTransactions();

const amountInput = ref<string>("");
const typeInput = ref<"income" | "expense">("expense");
const categoryInput = ref<string>("");
const descriptionInput = ref<string>("");
const dateInput = ref<string>("");
const submitting = ref(false);
const txError = ref<string | null>(null);
const filterType = ref<"all" | "income" | "expense">("all");
const filterCategory = ref<string>("all");
const sortBy = ref<"date" | "amount">("date");
const sortDirection = ref<"asc" | "desc">("desc");

const balance = computed(() =>
  transactions.value.reduce((sum, tx) => {
    const amount = Number(tx.amount) || 0;
    return tx.type === "income" ? sum + amount : sum - amount;
  }, 0)
);

const balanceFormatted = computed(() =>
  balance.value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
);

const formatAmount = (amount: number) =>
  Number(amount).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const formatDate = (isoString: string) => {
  const d = new Date(isoString);
  if (Number.isNaN(d.getTime())) return isoString;
  return d.toLocaleDateString();
};

const toMiddayISO = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);
  const d = new Date(year, month - 1, day, 12, 0, 0);
  return d.toISOString();
};

const categories = computed(() => {
  const set = new Set<string>();
  transactions.value.forEach((tx) => {
    if (tx.category) {
      set.add(tx.category);
    }
  });
  return Array.from(set).sort((a, b) => a.localeCompare(b));
});

const filteredTransactions = computed(() =>
  transactions.value.filter((tx) => {
    if (filterType.value !== "all" && tx.type !== filterType.value) {
      return false;
    }
    if (
      filterCategory.value !== "all" &&
      tx.category !== filterCategory.value
    ) {
      return false;
    }
    return true;
  })
);

const visibleTransactions = computed(() => {
  const list = [...filteredTransactions.value];

  return list.sort((a, b) => {
    if (sortBy.value === "date") {
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      if (Number.isNaN(da) || Number.isNaN(db)) return 0;
      return sortDirection.value === "desc" ? db - da : da - db;
    } else {
      const aa = Number(a.amount) || 0;
      const ab = Number(b.amount) || 0;
      return sortDirection.value === "desc" ? ab - aa : aa - ab;
    }
  });
});
onMounted(async () => {
  await fetchUser();
  await fetchTransactions();
});

const handleAddTransaction = async () => {
  txError.value = null;

  const parsedAmount = Number(amountInput.value);
  if (Number.isNaN(parsedAmount) || parsedAmount === 0) {
    txError.value = "Please enter a valid non-zero amount.";
    return;
  }

  submitting.value = true;

  try {
    await addTransaction({
      amount: parsedAmount,
      type: typeInput.value,
      category: categoryInput.value.trim() || undefined,
      description: descriptionInput.value.trim() || undefined,
      date: dateInput.value ? toMiddayISO(dateInput.value) : undefined,
    });

    // Clear form
    amountInput.value = "";
    categoryInput.value = "";
    descriptionInput.value = "";
    dateInput.value = "";
    typeInput.value = "expense";
  } catch (err: any) {
    txError.value = err.message || "Failed to add transaction.";
  } finally {
    submitting.value = false;
  }
};

const handleDeleteTransaction = async (id: string) => {
  const ok = window.confirm(
    "Are you sure you want to delete this transaction?"
  );
  if (!ok) return;

  try {
    await deleteTransaction(id);
  } catch (err: any) {
    txError.value = err.message || "Failed to delete transaction.";
  }
};
</script>
