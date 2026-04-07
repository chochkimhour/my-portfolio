import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  envPrefix: ['USER_', 'GITLAB_', 'LINKEDIN_', 'TELEGRAM_', 'TAGLINE', 'BRAND_', 'ABOUT_'],
  server: {
    host: true,
    allowedHosts: true
  }
})
