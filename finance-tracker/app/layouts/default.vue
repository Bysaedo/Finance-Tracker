<!--Default layout. Nuxt layouts wrap the pages and provide a consistent UI structure across all pages.-->
<template>
  <!--Creates full-screen wrapper-->
  <div class="min-h-screen bg-slate-100 text-slate-900">
    <header class="border-b bg-white/80 backdrop-blur">
      <nav
        class="mx-auto flex max-w-4xl items-center justify-between px-4 py-3"
      >
        <h1 class="text-lg font-semibold">Finance Tracker</h1>
      </nav>
    </header>
    <!--Renders the actual page content within the layout container -->
    <main class="mx-auto max-w-4xl px-4 py-8"><NuxtPage /></main>
  </div>
</template>
