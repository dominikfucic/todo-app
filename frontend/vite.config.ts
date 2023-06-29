/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001/api", // Replace with your target server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Optional rewrite path
      },
    },
  },
 
});
