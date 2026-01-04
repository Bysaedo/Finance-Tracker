// Defines a route middleware to protect authenticated routes. Checks if whether a user is logged in, if not, attempts to fetch the user data. If still not logged in, redirects to the home page.

//Nuxt auto-imports composables and utilities to use them globally.
import { useAuthUser, navigateTo } from "#imports";

export default defineNuxtRouteMiddleware(async () => {
  // Ensure this code only runs on the client side
  if (!process.client) return;
  //user => a reactive red holding current session. fetchUser=> calls Supabase to refresh session
  const { user, fetchUser } = useAuthUser();

  // If no user is logged in, try to fetch user data
  if (!user.value) {
    await fetchUser();
  }
  // If still no user, redirect to home page
  if (!user.value) {
    return navigateTo("/");
  }
});
