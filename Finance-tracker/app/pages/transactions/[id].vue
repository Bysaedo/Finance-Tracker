<!-- /pages/transactions/[id].vue -->
<template>
  <div class="min-h-screen bg-slate-950 text-slate-100">
    <div class="max-w-xl mx-auto px-4 py-6">
      <header class="flex items-center justify-between mb-4">
        <h1 class="text-2xl font-semibold">Edit Transaction</h1>
        <NuxtLink
          to="/transactions"
          class="text-sm text-slate-400 hover:underline"
        >
          Back to list
        </NuxtLink>
      </header>

      <div class="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <div
          v-if="loading"
          class="text-sm text-slate-400"
        >
          Loading...
        </div>
        <div
          v-else-if="!transaction"
          class="text-sm text-red-400"
        >
          Transaction not found.
        </div>
        <div v-else>
          <TransactionForm
            mode="edit"
            :initial-values="transaction"
            @success="handleSuccess"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { $supabase } = useNuxtApp();
const route = useRoute();
const router = useRouter();

const transaction = ref(null);
const loading = ref(true);

const loadTransaction = async () => {
  loading.value = true;
  const { data, error } = await $supabase
    .from("transactions")
    .select("*")
    .eq("id", route.params.id)
    .maybeSingle();

  if (!error) {
    transaction.value = data;
  }
  loading.value = false;
};

onMounted(loadTransaction);

const handleSuccess = () => {
  router.push("/transactions");
};
</script>
