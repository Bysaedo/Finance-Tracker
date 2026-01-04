//It configures Tailwind CSS for the project. It specifies the paths to all template files
// so that Tailwind can tree-shake unused styles in production builds. The configuration
// also includes a theme extension section where customizations to the default Tailwind theme
// can be added, although in this case, it is currently empty. Finally, it exports the
// configuration object as the default export of the module.

// Import the Config type from Tailwind CSS so the editor can provide type checking and autocompletion for the configuration object.
import type { Config } from "tailwindcss";

//"Tells" tailwind where to find all the template files in the project.
const config: Config = {
  content: [
    "./app/**/*.{vue,js,ts,jsx,tsx}",
    "./components/**/*.{vue,js,ts,jsx,tsx}",
    "./pages/**/*.{vue,js,ts,jsx,tsx}",
    "./layouts/**/*.{vue,js,ts,jsx,tsx}",
  ],
  //This section is for extending the default Tailwind theme with custom values.
  theme: {
    extend: {},
  },
  //This array is for adding Tailwind CSS plugins to enhance functionality.
  plugins: [],
};

export default config;
