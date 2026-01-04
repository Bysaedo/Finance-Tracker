<!--Authentication page. Users can create an account, log in with email and password and automatically redirect to dashboard if already logged in.-->
<template>
  <div class="mx-auto max-w-md space-y-6">
    <div class="space-y-2">
      <h2 class="text-2xl font-bold">
        {{ isLogin ? "Log in" : "Create an account" }}
      </h2>
      <p class="text-sm text-slate-600">
        {{
          isLogin
            ? "Log in to access your finance dashboard."
            : "Sign up to start tracking your finances."
        }}
      </p>
    </div>

    <form class="space-y-4" @submit.prevent="handleSubmit">
      <div class="space-y-1">
        <label class="block text-sm font-medium text-slate-700">Email</label>
        <input
          v-model="email"
          type="email"
          required
          class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
      </div>

      <div class="space-y-1">
        <label class="block text-sm font-medium text-slate-700">Password</label>
        <input
          v-model="password"
          type="password"
          required
          minlength="6"
          class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
      </div>

      <p v-if="errorMessage" class="text-sm text-red-600">
        {{ errorMessage }}
      </p>

      <button
        type="submit"
        :disabled="loading"
        class="flex w-full items-center justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 disabled:opacity-60"
      >
        <span v-if="loading">Please wait...</span>
        <span v-else>{{ isLogin ? "Log in" : "Sign up" }}</span>
      </button>
    </form>

    <button
      type="button"
      class="text-sm text-sky-600 hover:underline"
      @click="isLogin = !isLogin"
    >
      {{
        isLogin
          ? "Don't have an account? Sign up"
          : "Already have an account? Log in"
      }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { navigateTo } from "#app";
import { useSupabaseClient } from "~/composables/useSupabaseClient";
import { useAuthUser } from "~/composables/useAuthUser";

const supabase = useSupabaseClient();
const { user, fetchUser } = useAuthUser();

const isLogin = ref(true);
const email = ref("");
const password = ref("");
const loading = ref(false);
const errorMessage = ref<string | null>(null);

onMounted(async () => {
  await fetchUser();
  if (user.value) {
    await navigateTo("/dashboard");
  }
});

const handleSubmit = async () => {
  loading.value = true;
  errorMessage.value = null;

  try {
    if (isLogin.value) {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.value.trim(),
        password: password.value,
      });
      if (error) throw error;
    } else {
      const { error } = await supabase.auth.signUp({
        email: email.value.trim(),
        password: password.value,
      });
      if (error) throw error;
    }

    await fetchUser();
    if (user.value) {
      await navigateTo("/dashboard");
    }
  } catch (err: any) {
    errorMessage.value = err.message || "Something went wrong";
  } finally {
    loading.value = false;
  }
};
</script>
