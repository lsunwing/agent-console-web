import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const target = env.VITE_API_PROXY_TARGET || "http://localhost:8080";

  return {
    plugins: [vue()],
    server: {
      port: 5173,
      proxy: {
        "/api": {
          target,
          changeOrigin: true,
          // chat/tools/mcp 后端无 /api 前缀；rag/ping 后端本身就带 /api，不能剥掉
          rewrite: (path) =>
            path.startsWith("/api/rag") || path.startsWith("/api/ping")
              ? path
              : path.replace(/^\/api/, "")
        }
      }
    }
  };
});
