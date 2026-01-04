<!--Receives an array of transactions as a prop, groups them by month, sums income vs expenses per month and displays a bar chart using Chart.js via vue-chartjs.-->
<template>
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Overview</h2>
    <p class="text-xs text-slate-500">Monthly income vs expenses</p>

    <div class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <Bar
        v-if="chartData.datasets.length"
        :data="chartData"
        :options="chartOptions"
      />
      <p v-else class="text-sm text-slate-500">
        Not enough data to display chart yet.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Define the Transaction type
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

// Compute chart data
const chartData = computed(() => {
  if (!props.transactions?.length) {
    return {
      labels: [],
      datasets: [],
    };
  }

  const monthlyMap = new Map<string, { income: number; expense: number }>();

  for (const tx of props.transactions) {
    if (!tx.date) continue;
    const d = new Date(tx.date);
    if (Number.isNaN(d.getTime())) continue;

    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
    if (!monthlyMap.has(key)) {
      monthlyMap.set(key, { income: 0, expense: 0 });
    }
    const entry = monthlyMap.get(key)!;

    const amt = Number(tx.amount) || 0;
    if (tx.type === "income") {
      entry.income += amt;
    } else {
      entry.expense += amt;
    }
  }

  // Sort keys chronologically
  const sortedKeys = Array.from(monthlyMap.keys()).sort();

  const labels = sortedKeys.map((key) => {
    const [year, month] = key.split("-");
    const date = new Date(Number(year), Number(month) - 1, 1);
    return date.toLocaleString(undefined, {
      month: "short",
      year: "numeric",
    });
  });

  const incomeData = sortedKeys.map((key) => monthlyMap.get(key)!.income);
  const expenseData = sortedKeys.map((key) => monthlyMap.get(key)!.expense);

  return {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "rgba(34, 197, 94, 0.7)",
      },
      {
        label: "Expenses",
        data: expenseData,
        backgroundColor: "rgba(248, 113, 113, 0.7)",
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        font: {
          size: 12,
        },
      },
    },
  },
  scales: {
    x: {
      ticks: {
        font: {
          size: 11,
        },
      },
    },
    y: {
      ticks: {
        font: {
          size: 11,
        },
      },
    },
  },
};
</script>

<style scoped>
div[role="img"],
canvas {
  max-height: 260px;
}
</style>
