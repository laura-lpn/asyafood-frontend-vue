import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    hmr: {
        host: "localhost",
        clientPort:5173
    },
    watch: {
        usePolling: true
    },
    proxy: {
      '/api': {
        target: 'https://master-7rqtwti-isda55xcmtcww.fr-4.platformsh.site/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false, // Ignorer les erreurs de certificat
      }
    },
  }
})
