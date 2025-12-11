<!-- /pages/login.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
    <div class="w-full max-w-md bg-slate-900 border border-slate-700 rounded-xl p-8 shadow-lg">
      <h1 class="text-2xl font-semibold mb-6 text-center">Login</h1>

      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label class="block text-sm mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 focus:outline-none focus:ring focus:ring-emerald-500"
          />
        </div>

        <div>
          <label class="block text-sm mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            required
            minlength="6"
            class="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 focus:outline-none focus:ring focus:ring-emerald-500"
          />
        </div>

        <p v-if="errorMessage" class="text-sm text-red-400">
          {{ errorMessage }}
        </p>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-2 rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <p class="mt-4 text-sm text-center text-slate-400">
        Don’t have an account?
        <NuxtLink to="/signup" class="text-emerald-400 hover:underline">Sign up</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const { login } = useAuth()
const router = useRouter()

const onSubmit = async () => {
  errorMessage.value = ''
  loading.value = true
  const { error } = await login(email.value, password.value)
  loading.value = false

  if (error) {
    errorMessage.value = error.message || 'Login failed'
    return
  }

  router.push('/dashboard')
}
</script>

