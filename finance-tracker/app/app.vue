<template>
  <div class="min-h-screen bg-slate-100 text-slate-900">
    <header class="border-b bg-white">
      <nav
        class="mx-auto flex max-w-4xl items-center justify-between px-4 py-3"
      >
        <h1 class="text-lg font-semibold">Finance Tracker</h1>

        <div class="text-sm text-slate-500">
          <!-- We'll put user / logout here later -->
          v0.1
        </div>
      </nav>
    </header>

    <main class="mx-auto max-w-4xl px-4 py-8">
      <NuxtPage />
    </main>
  </div>
</template>
