import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://3.12.103.229:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})