import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  envPrefix: [
    'USER_',
    'GITHUB_',
    'LINKEDIN_',
    'TELEGRAM_',
    'NPM_',
    'PORTFOLIO_',
    'PROJECT_',
    'KHMER_CHHANKITEK_CALENDAR_',
    'INIT_BACKEND_PROJECT_',
    'SKILLS_',
    'EXPERTISE_',
    'STATS_',
    'SERVICE_',
    'EXPERIENCE_',
    'TAGLINE',
    'BRAND_',
    'ABOUT_',
    'SEO_'
  ],
  server: {
    host: true,
    allowedHosts: true
  }
})
