//This file creates a Supabase client instance and makes it available throughout the Nuxt application as a plugin.
//When the file has a .client.ts suffix, it indicates that the code is intended to run only on the client side.
import { createClient } from "@supabase/supabase-js"; //imporst the createClient function from the  Supabase JavaScript library (creates a new Supabase client instance)

export default defineNuxtPlugin(() => {
  //defines a Nuxt plugin(plugin = reusable piece of code that can be integrated into a Nuxt application to extend its functionality)
  const config = useRuntimeConfig(); //retrieves runtime configuration settings for the Nuxt application (typically includes sensitive information like API keys and URLs)

  const supabase = createClient(
    //creates a new Supabase client instance using the provided URL and anonymous key from the runtime configuration
    config.public.supabaseUrl, //Supabase project URL
    config.public.supabaseAnonKey //Supabase anonymous key
  );

  return {
    //the plugin returns an object that makes the Supabase client instance available throughout the Nuxt application
    provide: { supabase },
  };
});

/*Nuxt starts your app in the browser.
It scans /plugins and finds supabase.client.ts.
It runs the function inside defineNuxtPlugin.
That function creates the Supabase client.
It returns { provide: { supabase } }.
Nuxt attaches it as $supabase to its app context.
Now anywhere you call useNuxtApp(), you get access to $supabase.*/
