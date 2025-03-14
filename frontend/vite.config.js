import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',  // Địa chỉ backend của anh
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),  // Thay đổi đường dẫn URL cho API
      },
    },
  },
})
