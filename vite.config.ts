import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      // These aliases are needed to resolve the imports in the stories.
      lodash: 'lodash-es'
    }
  }
});
