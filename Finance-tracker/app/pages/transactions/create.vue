<!-- /pages/transactions/create.vue -->
<template>
  <div class="min-h-screen bg-slate-950 text-slate-100">
    <div class="max-w-xl mx-auto px-4 py-6">
      <header class="flex items-center justify-between mb-4">
        <h1 class="text-2xl font-semibold">Add Transaction</h1>
        <NuxtLink
          to="/transactions"
          class="text-sm text-slate-400 hover:underline"
        >
          Back to list
        </NuxtLink>
      </header>

      <div class="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <TransactionForm
          mode="create"
          @success="handleSuccess"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();

const handleSuccess = () => {
  router.push("/transactions");
};
</script>
