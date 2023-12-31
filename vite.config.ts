import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@components": "/src/components",
      "@composables": "/src/composables",
      "@utils": "/src/utils",
      "@router": "/src/router",
    },
  },
});
