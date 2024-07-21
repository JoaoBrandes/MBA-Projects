import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, UserConfig } from "vite";
import type { InlineConfig } from "vitest";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    setupFiles: ["./test/setup.ts"],
    environment: "happy-dom",
  },
} as UserConfig & {
  test: InlineConfig;
});
