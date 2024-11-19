import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: "./postcss.config.js", // Ensures Vite uses the PostCSS config
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@@": path.resolve(__dirname, "public/"),
      components: path.resolve(__dirname, "src/components/"),
      shared: path.resolve(__dirname, "./src/shared/"),
      public: path.resolve(__dirname, "./public/"),
      pages: path.resolve(__dirname, "src/pages"),
      types: path.resolve(__dirname, "src/@types/"),
    },
  },
});
