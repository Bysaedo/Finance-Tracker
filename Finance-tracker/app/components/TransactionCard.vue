<!-- /components/TransactionCard.vue -->
<template>
  <div
    class="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-lg px-3 py-2"
  >
    <div class="flex flex-col">
      <div class="flex items-center gap-2">
        <span
          class="inline-flex items-center px-2 py-0.5 text-xs rounded-full"
          :class="badgeClass"
        >
          {{ transaction.type }}
        </span>
        <span class="text-sm font-medium">
          {{ transaction.category }}
        </span>
      </div>
      <p
        v-if="transaction.description"
        class="text-xs text-slate-400 mt-1"
      >
        {{ transaction.description }}
      </p>
      <p class="text-xs text-slate-500 mt-1">
        {{ transaction.date }}
      </p>
    </div>

    <div class="flex flex-col items-end gap-1">
      <span
        class="text-sm font-semibold"
        :class="amountClass"
      >
        {{ sign }}{{ Number(transaction.amount).toFixed(2) }}
      </span>

      <div
        v-if="!compact"
        class="flex items-center gap-2 text-xs"
      >
        <NuxtLink
          :to="`/transactions/${transaction.id}`"
          class="px-2 py-0.5 rounded-md border border-slate-600 hover:bg-slate-800"
        >
          Edit
        </NuxtLink>
        <button
          @click="handleDelete"
          class="px-2 py-0.5 rounded-md border border-red-500 text-red-400 hover:bg-red-950"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  transaction: {
    type: Object,
    required: true,
  },
  compact: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["deleted"]);

const { deleteTransaction, fetchTransactions } = useTransactions();

const badgeClass = computed(() =>
  props.transaction.type === "income"
    ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/40"
    : "bg-rose-500/10 text-rose-300 border border-rose-500/40"
);

const amountClass = computed(() =>
  props.transaction.type === "income" ? "text-emerald-400" : "text-rose-400"
);

const sign = computed(() => (props.transaction.type === "income" ? "+" : "-"));

const handleDelete = async () => {
  if (!confirm("Delete this transaction?")) return;
  await deleteTransaction(props.transaction.id);
  await fetchTransactions();
  emit("deleted");
};
</script>
