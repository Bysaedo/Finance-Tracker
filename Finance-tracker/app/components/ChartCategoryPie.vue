<!-- /components/ChartCategoryPie.vue -->
<template>
  <div class="w-full">
    <client-only>
      <ApexChart
        type="pie"
        :options="chartOptions"
        :series="series"
        height="260"
      />
    </client-only>
  </div>
</template>

<script setup>
import VueApexCharts from 'vue3-apexcharts'
const ApexChart = VueApexCharts

const props = defineProps({
  transactions: {
    type: Array,
    default: () => []
  }
})

const categoryTotals = computed(() => {
  const totals = {}
  for (const t of props.transactions) {
    if (t.type !== 'expense') continue
    const cat = t.category || 'Other'
    totals[cat] = (totals[cat] || 0) + Number(t.amount)
  }
  return totals
})

const series = computed(() => Object.values(categoryTotals.value))
const labels = computed(() => Object.keys(categoryTotals.value))

const chartOptions = computed(() => ({
  labels: labels.value,
  legend: {
    position: 'bottom',
    labels: { colors: '#cbd5f5' }
  },
  theme: {
    mode: 'dark'
  },
  dataLabels: {
    enabled: true
  }
}))
</script>
