<template>
  <div class="mx-auto max-w-3xl space-y-4">
    <h1 class="text-2xl font-bold">Dashboard</h1>

    <p class="text-slate-600">
      You're logged in 🎉 Finance tracker coming next.
    </p>

    <button
      class="rounded-md bg-slate-800 px-3 py-2 text-sm text-white"
      @click="logout"
    >
      Log out
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthUser } from "~/composables/useAuthUser";

definePageMeta({
  middleware: "auth",
});
const { user, logout, fetchUser } = useAuthUser();

onMounted(async () => {
  await fetchUser();
});
</script>
