// app/composables/useAuthUser.ts
import type { User } from "@supabase/supabase-js";
import { navigateTo, useState } from "#imports";
import { useSupabaseClient } from "~/composables/useSupabaseClient";

export const useAuthUser = () => {
  const user = useState<User | null>("auth_user", () => null);
  const supabase = useSupabaseClient();

  const fetchUser = async () => {
    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser();
    user.value = currentUser;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    user.value = null;
    await navigateTo("/");
  };

  return {
    user,
    fetchUser,
    logout,
  };
};
