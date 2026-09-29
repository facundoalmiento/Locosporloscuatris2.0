import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { VitePWA } from "vite-plugin-pwa"

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      // No cachear nada de la API — la app siempre tiene que ver datos
      // frescos (reservas, mantenimiento, etc.), no una foto vieja guardada
      // en el celular del usuario.
      workbox: {
        navigateFallbackDenylist: [/^\/api\//],
        runtimeCaching: [
          {
            urlPattern: /^\/api\//,
            handler: "NetworkOnly",
          },
        ],
      },
      includeAssets: ["favicon.ico", "apple-touch-icon-180x180.png"],
      manifest: {
        name: "Locos por los Cuatris",
        short_name: "LPLC",
        description: "Travesías en cuatriciclo, ATV y UTV por médanos, barro y caminos de Argentina.",
        lang: "es-AR",
        start_url: "/",
        display: "standalone",
        theme_color: "#0a0a0a",
        background_color: "#0a0a0a",
        icons: [
          { src: "/pwa-64x64.png", sizes: "64x64", type: "image/png" },
          { src: "/pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "/pwa-512x512.png", sizes: "512x512", type: "image/png" },
          {
            src: "/maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
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
