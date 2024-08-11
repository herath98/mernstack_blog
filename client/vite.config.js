import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',  // Ensure this matches your backend port
        secure: false,  // If you’re not using HTTPS locally, this can stay false
        changeOrigin: true,  // Useful if the backend expects a different origin
      },
    },
  },
  plugins: [react()],
})
