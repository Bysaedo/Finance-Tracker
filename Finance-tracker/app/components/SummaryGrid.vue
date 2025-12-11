<!-- /components/SummaryGrid.vue -->
<template>
  <div class="grid md:grid-cols-3 gap-4">
    <SummaryWidget
      label="Total Income"
      :value="totalIncome"
      hint="All recorded income"
    />
    <SummaryWidget
      label="Total Expenses"
      :value="totalExpense"
      hint="All recorded expenses"
    />
    <SummaryWidget
      label="Net Balance"
      :value="netBalance"
      hint="Income - Expenses"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  totalIncome: {
    type: Number,
    default: 0
  },
  totalExpense: {
    type: Number,
    default: 0
  },
  netBalance: {
    type: Number,
    default: 0
  }
})
</script>
