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
      cssFileName: "app", // 如果想让生成的 css 叫 app.css，保留此项
      entry: resolve(__dirname, "src/main.tsx"),
      fileName: () => "app.js",
      formats: ["umd"],
      name: "app",
    },
    outDir: tmpDir,
    sourcemap: "hidden",
    target: "es2024",
    // 如果之后需要强制把所有 asset/css 改名，可以取消下方注释
    // rollupOptions: {
    //   output: {
    //     assetFileNames: (assetInfo) => {
    //       if (assetInfo.name && assetInfo.name.endsWith('.css')) {
    //         return 'app.css';
    //       }
    //       return '[name].[ext]';
    //     }
    //   }
    // }
  },

  // 1. 核心 CSS 优化（适配 Vite 8.1 + 解决 lightningcss 的 :global 报错）
  css: {
    lightningcss: {
      // 👈 开启这个，lightningcss 就能完美识别并处理 :global 语法了
      cssModules: true,
    },
    minify: true, // Vite 8.x 推荐直接在这里开启 CSS 压缩
    transformer: "lightningcss",
  },

  define: {
    __DEV__: "false",
    DEBUG: "false",
    "process.env.NODE_ENV": JSON.stringify("production"),
    "process.env.WEBPACK_ENV": JSON.stringify("production"),
  },

  esbuild: {
    legalComments: "none",
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
