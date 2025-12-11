<!-- /components/SummaryWidget.vue -->
<template>
  <div class="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
    <p class="text-xs text-slate-400 uppercase tracking-wide">{{ label }}</p>
    <p class="text-xl font-semibold">{{ formattedValue }}</p>
    <p
      v-if="hint"
      class="text-xs text-slate-500"
    >
      {{ hint }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  value: {
    type: Number,
    default: 0,
  },
  hint: {
    type: String,
    default: "",
  },
  prefix: {
    type: String,
    default: "$",
  },
});

const formattedValue = computed(
  () => `${props.prefix}${props.value.toFixed(2)}`
);
</script>
