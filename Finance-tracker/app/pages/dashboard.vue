<!-- /pages/dashboard.vue -->
<template>
  <div class="min-h-screen bg-slate-950 text-slate-100">
    <div class="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <header class="flex items-center justify-between">
        <h1 class="text-2xl font-semibold">Dashboard</h1>
        <div class="flex items-center gap-3">
          <span
            v-if="user"
            class="text-sm text-slate-400"
          >
            {{ user.email }}
          </span>
          <button
            @click="handleLogout"
            class="px-3 py-1 rounded-md border border-slate-600 text-sm hover:bg-slate-800"
          >
            Logout
          </button>
        </div>
      </header>

      <SummaryGrid
        :total-income="totalIncome"
        :total-expense="totalExpense"
        :net-balance="netBalance"
      />

      <div class="grid lg:grid-cols-2 gap-6">
        <div class="bg-slate-900 rounded-xl border border-slate-800 p-4">
          <h2 class="text-lg font-semibold mb-2">Income vs Expense</h2>
          <ChartIncomeExpenseLine :transactions="transactions" />
        </div>

        <div class="bg-slate-900 rounded-xl border border-slate-800 p-4">
          <h2 class="text-lg font-semibold mb-2">Spending by Category</h2>
          <ChartCategoryPie :transactions="transactions" />
        </div>
      </div>

      <section class="bg-slate-900 rounded-xl border border-slate-800 p-4">
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-lg font-semibold">Recent Transactions</h2>
          <NuxtLink
            to="/transactions"
            class="text-sm text-emerald-400 hover:underline"
          >
            View all
          </NuxtLink>
        </div>

        <div
          v-if="loading"
          class="text-sm text-slate-400"
        >
          Loading...
        </div>
        <div
          v-else-if="transactions.length === 0"
          class="text-sm text-slate-400"
        >
          No transactions yet.
          <NuxtLink
            to="/transactions/create"
            class="text-emerald-400"
            >Add one</NuxtLink
          >.
        </div>
        <ul
          v-else
          class="space-y-2"
        >
          <li
            v-for="t in recentTransactions"
            :key="t.id"
          >
            <TransactionCard
              :transaction="t"
              :compact="true"
            />
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup>
const { user, logout } = useAuth();

const {
  transactions,
  loading,
  fetchTransactions,
  totalIncome,
  totalExpense,
  netBalance,
} = useTransactions();

onMounted(() => {
  fetchTransactions();
});

const recentTransactions = computed(() => transactions.value.slice(0, 5));

const handleLogout = async () => {
  await logout();
  navigateTo("/login");
};
</script>
