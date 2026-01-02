<template>
  <div class="space-y-4">
    <h2 class="text-lg font-semibold">By category</h2>
    <p class="text-xs text-slate-500">
      Breakdown of income and expenses by category
    </p>

    <div class="grid gap-4 md:grid-cols-2">
      <!-- Expenses -->
      <div class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h3 class="mb-2 text-sm font-medium text-slate-700">Expenses</h3>
        <div class="h-64">
          <Doughnut
            v-if="expenseData.labels.length"
            :data="expenseData"
            :options="chartOptions"
          />
          <p v-else class="mt-4 text-sm text-slate-500">No expense data yet.</p>
        </div>
      </div>

      <!-- Income -->
      <div class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h3 class="mb-2 text-sm font-medium text-slate-700">Income</h3>
        <div class="h-64">
          <Doughnut
            v-if="incomeData.labels.length"
            :data="incomeData"
            :options="chartOptions"
          />
          <p v-else class="mt-4 text-sm text-slate-500">No income data yet.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type Transaction = {
  id: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  category?: string | null;
};

const props = defineProps<{
  transactions: Transaction[];
}>();

// Simple color palette for categories
const colors = [
  "#0ea5e9", // sky-500
  "#6366f1", // indigo-500
  "#22c55e", // emerald-500
  "#eab308", // yellow-500
  "#f97316", // orange-500
  "#ec4899", // pink-500
  "#a855f7", // purple-500
  "#facc15", // yellow-400
  "#14b8a6", // teal-500
  "#f97373", // soft red
];

const buildCategoryData = (type: "income" | "expense") => {
  const map = new Map<string, number>();

  for (const tx of props.transactions ?? []) {
    if (tx.type !== type) continue;
    const amount = Number(tx.amount) || 0;
    if (!amount) continue;

    const cat = (tx.category || "Uncategorized").trim() || "Uncategorized";

    map.set(cat, (map.get(cat) || 0) + Math.abs(amount));
  }

  const labels = Array.from(map.keys());

  const data = labels.map((label) => map.get(label) || 0);

  const backgroundColor = labels.map((_, idx) => colors[idx % colors.length]);

  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor,
        borderWidth: 1,
      },
    ],
  };
};

const expenseData = computed(() => buildCategoryData("expense"));
const incomeData = computed(() => buildCategoryData("income"));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        font: {
          size: 11,
        },
      },
    },
  },
};
</script>

<style scoped>
.h-64 {
  height: 16rem;
}
</style>
