<!-- /components/ChartIncomeExpenseLine.vue -->
<template>
  <div class="w-full">
    <client-only>
      <ApexChart
        type="line"
        :options="chartOptions"
        :series="series"
        height="260"
      />
    </client-only>
  </div>
</template>

<script setup>
import VueApexCharts from "vue3-apexcharts";
const ApexChart = VueApexCharts;

const props = defineProps({
  transactions: {
    type: Array,
    default: () => [],
  },
});

function monthKey(dateStr) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

const monthlyData = computed(() => {
  const map = {};
  for (const t of props.transactions) {
    if (!t.date) continue;
    const key = monthKey(t.date);
    if (!map[key]) {
      map[key] = { income: 0, expense: 0 };
    }
    if (t.type === "income") {
      map[key].income += Number(t.amount);
    } else if (t.type === "expense") {
      map[key].expense += Number(t.amount);
    }
  }

  const sortedKeys = Object.keys(map).sort();
  return {
    categories: sortedKeys,
    income: sortedKeys.map((k) => map[k].income),
    expense: sortedKeys.map((k) => map[k].expense),
  };
});

const series = computed(() => [
  {
    name: "Income",
    data: monthlyData.value.income,
  },
  {
    name: "Expenses",
    data: monthlyData.value.expense,
  },
]);

const chartOptions = computed(() => ({
  xaxis: {
    categories: monthlyData.value.categories,
    labels: { style: { colors: "#cbd5f5" } },
  },
  yaxis: {
    labels: { style: { colors: "#cbd5f5" } },
  },
  legend: {
    labels: { colors: "#cbd5f5" },
  },
  theme: { mode: "dark" },
  stroke: { curve: "smooth" },
}));
</script>
