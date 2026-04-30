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
    'GITLAB_',
    'LINKEDIN_',
    'TELEGRAM_',
    'NPM_',
    'PORTFOLIO_',
    'PROJECT_',
    'API_CORE_BACKEND_',
    'INIT_BACKEND_PROJECT_',
    'SKILLS_',
    'EXPERTISE_',
    'STATS_',
    'SERVICE_',
    'EXPERIENCE_',
    'TAGLINE',
    'BRAND_',
    'ABOUT_'
  ],
  server: {
    host: true,
    allowedHosts: true
  }
})
