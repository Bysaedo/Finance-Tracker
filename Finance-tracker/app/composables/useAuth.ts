export function useAuth() {
  //Declares a composable function named useAuth (Nuxt automatically imports it anywhere in the app)
  const { $supabase } = useNuxtApp(); //Access Supabase client from Nuxt app context
  const user = ref(null); //Reactive reference that stores the currently logged-in user's information

  const fetchUser = async () => {
    //Function to fetch the current logged-in user's information from Supabase
    const { data } = await $supabase.auth.getUser();
    user.value = data.user;
  };

  const signup = async (email: string, password: string) => {
    //calls Supabase auth signUp method with email and password
    return await $supabase.auth.signUp({ email, password }); //If successful, creates a new user account
  };

  const login = async (email, password) => {
    //calls Supabase auth signInWithPassword method with email and password
    return await $supabase.auth.signInWithPassword({ email, password }); //If successful, supabase creates a session for the user, the user is stored in local storage, auth.global.ts now allows protected routes to be accessed.
  };

  const logout = async () => {
    await $supabase.auth.signOut(); //Deletes the current user's session from Supabase, clears local storage and auth.global.ts blocks access to protected routes
    user.value = null;
  };

  onMounted(fetchUser); //When the component using this composable is mounted, fetch the current user's information.
  return { user, signup, login, logout, fetchUser };
}
