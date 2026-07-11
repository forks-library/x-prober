import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

const REGEX = /^\/api/;
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    build: {
      manifest: true,
      outDir: "../dist",
      target: "esnext",
      // rollupOptions: {
      //   external: ['react', 'react-dom'],
      //   output: {
      //     globals: {
      //       react: 'React',
      //       'react-dom': 'ReactDOM',
      //     },
      //   },
      // },

      // rollupOptions: {
      //   input: new URL('./src/main.tsx', import.meta.url).pathname,
      // },
    },
    css: {
      modules: {
        generateScopedName: "[name]__[local]_[hash]",
      },
    },
    define: {
      VITE_PORT: JSON.stringify(env.VITE_PORT),
    },
    envDir: "./",
    plugins: [react()],
    resolve: {
      alias: {
        "@": `${dirname(fileURLToPath(import.meta.url))}/src`,
      },
      tsconfigPaths: true,
    },
    root: "./dev",
    server: {
      proxy: {
        "/api": {
          changeOrigin: true,
          rewrite: (path) => path.replace(REGEX, ""),
          target: "http://localhost:8000/api.php",
        },
      },
    },
  };
});
