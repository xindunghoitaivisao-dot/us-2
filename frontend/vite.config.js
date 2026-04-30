import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      // Treat .js files as JSX so existing imports keep working
      react({ include: /\.(js|jsx|ts|tsx)$/ }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      "process.env.REACT_APP_BACKEND_URL": JSON.stringify(
        env.REACT_APP_BACKEND_URL || ""
      ),
      "process.env.REACT_APP_WEB3FORMS_KEY": JSON.stringify(
        env.REACT_APP_WEB3FORMS_KEY || ""
      ),
    },
    envPrefix: ["VITE_", "REACT_APP_"],
    server: {
      host: "0.0.0.0",
      port: 3000,
      strictPort: true,
      allowedHosts: true,
      hmr: {
        clientPort: 443,
        protocol: "wss",
      },
    },
    build: {
      outDir: "build",
      sourcemap: false,
    },
  };
});
