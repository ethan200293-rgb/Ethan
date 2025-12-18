import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // CRITICAL: This base path must match your GitHub repository name
  // Because your URL is https://ethan200293-rgb.github.io/Ethan/
  // The base must be '/Ethan/'
  base: '/Ethan/',
})