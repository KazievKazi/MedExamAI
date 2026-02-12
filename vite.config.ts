import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  base: '/MedExamAI/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://46.149.78.16:8080',
        changeOrigin: true
      },
      '/quiz': {
        target: 'http://46.149.78.16:8888',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/quiz/, '')
      }
    }
  }
})
