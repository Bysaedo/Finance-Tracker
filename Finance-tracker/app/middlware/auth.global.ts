//Middleware runs before any page loads
//Purpose: to check if user is authenticated before accessing protected routes
export default defineNuxtRouteMiddleware(async (to) => {
  //defineNuxtRouteMiddleware is a Nuxt function to define route middleware
  const { $supabase } = useNuxtApp(); //Access Supabase client from Nuxt app context (Needed to know if user is logged in)

  const publicRoutes = ["login", "signup", "index"]; //List of routes that do not require authentication

  if (publicRoutes.includes(to.name as string)) return;
  const { data } = await $supabase.auth.getSession(); //Get current session from Supabase auth data.sessions exist or is null
  if (!data.session) {
    return navigateTo("/login"); //If no session exists, redirect to login page
  }
});
