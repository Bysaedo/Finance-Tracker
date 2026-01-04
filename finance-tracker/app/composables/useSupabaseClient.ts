// Defines how the app connects to Supabase and ensures only one Supabase client instance for the frontend. Reads Supabase credentials from runtime config. Creates a Supabase client only once. Enables persistent login and token refreshing. Returns the same client.
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { useRuntimeConfig } from "#imports";

let client: SupabaseClient | null = null;

export const useSupabaseClient = () => {
  if (!client) {
    const config = useRuntimeConfig();

    const supabaseUrl = config.public.supabaseUrl as string;
    const supabaseAnonKey = config.public.supabaseAnonKey as string;

    client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }

  return client;
};
