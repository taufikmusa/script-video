import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' supaya jalan di GitHub Pages (https://USERNAME.github.io/script-video/)
export default defineConfig({
  plugins: [react()],
  base: './',
})
