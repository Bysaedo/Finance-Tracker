<!-- /pages/transactions/index.vue -->
<template>
  <div class="min-h-screen bg-slate-950 text-slate-100">
    <div class="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <header class="flex items-center justify-between">
        <h1 class="text-2xl font-semibold">Transactions</h1>
        <NuxtLink
          to="/transactions/create"
          class="px-3 py-1 rounded-md bg-emerald-500 text-slate-900 font-semibold text-sm hover:bg-emerald-400"
        >
          + Add Transaction
        </NuxtLink>
      </header>

      <!-- Simple filters -->
      <div
        class="bg-slate-900 border border-slate-800 rounded-xl p-4 grid gap-4 md:grid-cols-4 text-sm"
      >
        <div>
          <label class="block text-xs mb-1">Type</label>
          <select
            v-model="filters.type"
            class="w-full bg-slate-800 border border-slate-700 rounded-md px-2 py-1"
            @change="fetchTransactions"
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div>
          <label class="block text-xs mb-1">Category</label>
          <select
            v-model="filters.category"
            class="w-full bg-slate-800 border border-slate-700 rounded-md px-2 py-1"
            @change="fetchTransactions"
          >
            <option value="all">All</option>
            <option value="Salary">Salary</option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label class="block text-xs mb-1">From</label>
          <input
            v-model="filters.fromDate"
            type="date"
            class="w-full bg-slate-800 border border-slate-700 rounded-md px-2 py-1"
            @change="fetchTransactions"
          />
        </div>

        <div>
          <label class="block text-xs mb-1">To</label>
          <input
            v-model="filters.toDate"
            type="date"
            class="w-full bg-slate-800 border border-slate-700 rounded-md px-2 py-1"
            @change="fetchTransactions"
          />
        </div>
      </div>

      <div class="flex justify-end">
        <select
          v-model="filters.sortBy"
          class="bg-slate-900 border border-slate-800 rounded-md px-2 py-1 text-sm"
          @change="fetchTransactions"
        >
          <option value="date-desc">Newest first</option>
          <option value="date-asc">Oldest first</option>
          <option value="amount-desc">Amount high → low</option>
          <option value="amount-asc">Amount low → high</option>
        </select>
      </div>

      <section class="bg-slate-900 rounded-xl border border-slate-800 p-4">
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
          No transactions found.
        </div>
        <ul
          v-else
          class="space-y-2"
        >
          <li
            v-for="t in transactions"
            :key="t.id"
          >
            <TransactionCard
              :transaction="t"
              @deleted="fetchTransactions"
            />
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup>
const { transactions, loading, filters, fetchTransactions } = useTransactions();

onMounted(() => {
  fetchTransactions();
});
</script>
