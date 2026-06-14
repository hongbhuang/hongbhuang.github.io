import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Repository IS the user/organization site (<owner>.github.io), so it is
  // served from the domain root and must NOT carry a /<repo>/ base prefix.
  base: '/',
})
