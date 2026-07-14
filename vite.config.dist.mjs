import { existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));
const tmpDir = resolve(__dirname, ".tmp");
if (!existsSync(tmpDir)) {
  mkdirSync(tmpDir);
}
export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      cssFileName: "app",
      entry: resolve(__dirname, "src/main.tsx"),
      fileName: () => "app.js",
      formats: ["umd"],
      name: "app",
    },
    outDir: tmpDir,
  },
  define: {
    __DEV__: "false",
    DEBUG: "false",
    "process.env.NODE_ENV": JSON.stringify("production"),
    "process.env.WEBPACK_ENV": JSON.stringify("production"),
  },
  mode: "production",
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src/"),
    },
    extensions: [".ts", ".tsx", ".js", ".mjs"],
  },
  root: __dirname,
});
