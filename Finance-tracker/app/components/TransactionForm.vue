<!-- /components/TransactionForm.vue -->
<template>
  <form
    @submit.prevent="onSubmit"
    class="space-y-4 text-sm"
  >
    <div class="grid md:grid-cols-2 gap-4">
      <div>
        <label class="block text-xs mb-1">Amount</label>
        <input
          v-model.number="form.amount"
          type="number"
          min="0"
          step="0.01"
          required
          class="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2"
        />
      </div>

      <div>
        <label class="block text-xs mb-1">Type</label>
        <select
          v-model="form.type"
          required
          class="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
    </div>

    <div class="grid md:grid-cols-2 gap-4">
      <div>
        <label class="block text-xs mb-1">Category</label>
        <select
          v-model="form.category"
          required
          class="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2"
        >
          <option value="">Select category</option>
          <option value="Salary">Salary</option>
          <option value="Food">Food</option>
          <option value="Rent">Rent</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label class="block text-xs mb-1">Date</label>
        <input
          v-model="form.date"
          type="date"
          required
          class="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2"
        />
      </div>
    </div>

    <div>
      <label class="block text-xs mb-1">Description (optional)</label>
      <textarea
        v-model="form.description"
        rows="2"
        class="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2"
      />
    </div>

    <p
      v-if="errorMessage"
      class="text-xs text-red-400"
    >
      {{ errorMessage }}
    </p>

    <div class="flex justify-end gap-2 pt-2">
      <button
        type="button"
        @click="$emit('cancel')"
        class="px-3 py-1 rounded-md border border-slate-600 hover:bg-slate-800"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="loading"
        class="px-4 py-1 rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold disabled:opacity-60"
      >
        {{ loading ? "Saving..." : submitLabel }}
      </button>
    </div>
  </form>
</template>

<script setup>
const props = defineProps({
  mode: {
    type: String,
    default: "create", // 'create' | 'edit'
  },
  initialValues: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["success", "cancel"]);

const { addTransaction, updateTransaction } = useTransactions();

const loading = ref(false);
const errorMessage = ref("");

const today = new Date().toISOString().slice(0, 10);

const form = reactive({
  amount: props.initialValues.amount ?? null,
  type: props.initialValues.type ?? "expense",
  category: props.initialValues.category ?? "",
  date: props.initialValues.date ?? today,
  description: props.initialValues.description ?? "",
});

const submitLabel = computed(() => (props.mode === "edit" ? "Update" : "Save"));

const onSubmit = async () => {
  errorMessage.value = "";
  loading.value = true;

  try {
    const payload = {
      amount: Number(form.amount),
      type: form.type,
      category: form.category,
      date: form.date,
      description: form.description || null,
    };

    if (props.mode === "edit" && props.initialValues.id) {
      await updateTransaction(props.initialValues.id, payload);
    } else {
      await addTransaction(payload);
    }

    emit("success");
  } catch (err) {
    errorMessage.value = err.message || "Error saving transaction";
  } finally {
    loading.value = false;
  }
};
</script>
