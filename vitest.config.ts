import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      include: ["**/*.test.tsx"],
      setupFiles: ["./vitest.setup.ts"],
      globals: true,
    },
  })
);
