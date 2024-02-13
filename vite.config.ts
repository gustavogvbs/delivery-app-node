import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "./prisma/vitest-environment-prisma",
    include: ["**/**/*.spec.ts"],
  },
  plugins: [tsconfigPaths()],
});
