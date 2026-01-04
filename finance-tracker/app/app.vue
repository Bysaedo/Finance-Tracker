<!--Root layout wrapper for the application (everything the user sees is rendered inside this file)-->
<template>
  <!--Root container. Makes the app at least full screen height, sets default bg color, sets global text color.-->
  <div class="min-h-screen bg-slate-100 text-slate-900">
    <!--Global header-->
    <header class="border-b bg-white">
      <nav
        class="mx-auto flex max-w-4xl items-center justify-between px-4 py-3"
      >
        <h1 class="text-lg font-semibold">Finance Tracker</h1>

        <div class="text-sm text-slate-500"></div>
      </nav>
    </header>
    <!--Main content wrapper. Renders index.vue, signup.vue and dashboard.vue-->
    <main class="mx-auto max-w-4xl px-4 py-8">
      <NuxtPage />
    </main>
  </div>
</template>
