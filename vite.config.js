import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  build: {
    minify: "esbuild",
    sourcemap: false,
  },
  server: {
    // En desarrollo, el sitio corre en :5173 y el backend en :3001.
    // Este proxy hace que "/api/..." desde el navegador viaje al backend,
    // exactamente como va a pasar en producción (mismo dominio, sin CORS).
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
})
