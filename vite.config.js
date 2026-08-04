import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
export default defineConfig(function (_a) {
    var mode = _a.mode;
    var env = loadEnv(mode, process.cwd(), "");
    var target = env.VITE_API_PROXY_TARGET || "http://localhost:8080";
    return {
        plugins: [vue()],
        server: {
            port: 5173,
            proxy: {
                "/api": {
                    target: target,
                    changeOrigin: true,
                    rewrite: function (path) { return path.replace(/^\/api/, ""); }
                }
            }
        }
    };
});
