//Central configuration for the Nuxt application
import tailwindcss from "@tailwindcss/vite";

//Everything inside defineNuxtConfig configures how the app behaves
export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@nuxt/ui"], //Integrate ESLint and Nuxt UI modules

  // Enable Nuxt DevTools for enhanced development experience
  devtools: {
    enabled: true,
  },

  // Global CSS file inclusion to apply styles across the app
  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  // Configure PostCSS plugins through Nuxt
  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },

  // Runtime configuration for environment variables
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.NUXT_SUPABASE_URL,
      supabaseAnonKey: process.env.NUXT_SUPABASE_ANON_KEY,
    },
  },

  //Pre-render the / page at build time for better performance
  routeRules: {
    "/": { prerender: true },
  },

  //Makes the app Vercel-friendly
  nitro: {
    preset: "vercel",
  },

  compatibilityDate: "2025-01-15",

  // ESLint configuration for code quality and style enforcement, makes formatting consistent
  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },
});
