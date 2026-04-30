# Portfolio Website

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=000000)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwindcss&logoColor=ffffff)
![Node.js](https://img.shields.io/badge/Node.js-20.19+-339933?logo=nodedotjs&logoColor=ffffff)
![Docker](https://img.shields.io/badge/Docker-supported-2496ED?logo=docker&logoColor=ffffff)
![Type](https://img.shields.io/badge/Type-ESM%20JavaScript-F7DF1E?logo=javascript&logoColor=000000)
![License](https://img.shields.io/badge/License-MIT-blue)

A production-ready personal portfolio website built with React, Vite, Tailwind CSS, and Docker. The application presents professional experience, services, featured projects, contact links, and a small interactive portfolio assistant.

## Overview

This project is designed as a fast, responsive, and maintainable portfolio application. It uses environment-based profile configuration so personal details, contact information, and branding content can be managed without changing the component code.

## Features

- Responsive single-page portfolio experience
- Professional sections for hero, about, services, experience, projects, and contact
- Environment-driven personal information and social links
- Interactive portfolio assistant component
- Light and dark theme support
- Vite development server with fast refresh
- Docker and Docker Compose support for local development

## Tech Stack

- React 19
- Tailwind CSS 4
- Vite
- ESLint
- Docker

## Requirements

Use one of the following setups:

- Node.js 20 or later with npm
- Docker and Docker Compose

## Configuration

All portfolio content is driven by environment variables. The source code reads profile data, contact links, projects, skills, services, and experience from env values in `src/constants/index.js`.

For local development, create a private `.env` file:

```bash
cp .env.example .env
```

On Windows Command Prompt:

```cmd
copy .env.example .env
```

Then update `.env` with your real portfolio data. The `.env` file is ignored by git, so local personal data stays out of the repository.

Use `.env.example` as the complete list of supported variables. The main groups are:

- `USER_*` for name, role, email, and location
- `GITHUB_URL`, `GITLAB_URL`, `LINKEDIN_URL`, `NPM_PACKAGE_URL`, `TELEGRAM_*` for public profiles
- `PROJECT_*`, `PORTFOLIO_*`, `API_CORE_BACKEND_*`, and `INIT_BACKEND_PROJECT_*` for featured projects
- `SKILLS_*`, `EXPERTISE_ITEMS`, and `STATS_*` for profile detail
- `TAGLINE`, `BRAND_DESCRIPTION`, `ABOUT_P1`, `ABOUT_P2`, and `SEO_*` for hero/about/metadata copy
- `SERVICE_*` for service cards
- `EXPERIENCE_*` for work history

Keep `.env` local for development. For GitHub Pages deployment, commit `.env.production` with public portfolio values so Vite can compile those values into the static site.

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the application at:

```text
http://localhost:5173
```

## Docker Development

Build and start the application:

```bash
docker compose up -d --build
```

Open the application at:

```text
http://localhost:5173
```

Stop the container:

```bash
docker compose down
```

## Available Scripts

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Builds the application for production.

```bash
npm run preview
```

Serves the production build locally for verification.

```bash
npm run lint
```

Runs ESLint across the project.

## Project Structure

```text
src/
  assets/       Static images and visual assets
  components/   Reusable page sections and UI components
  constants/    Navigation, profile, project, service, and content data
  layouts/      Shared layout components
  pages/        Page-level views
  utils/        Utility logic
```

## Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the generated build locally:

```bash
npm run preview
```

The production output is generated in the `dist` directory.

## GitHub Pages Deployment

This project is ready for GitHub Pages hosting through GitHub Actions.

1. Push the repository to GitHub, including `.env.production`.
2. In the GitHub repository, open `Settings` > `Pages`.
3. Set `Build and deployment` > `Source` to `GitHub Actions`.
4. Push to the `main` or `master` branch.

The workflow in `.github/workflows/ci.yml` installs dependencies, runs lint, builds the site with Vite, and deploys the `dist` folder to GitHub Pages. Vite automatically loads `.env.production` during `npm run build`.

After `.env.production` is pushed, rerun the GitHub Actions workflow or push a new commit so GitHub Pages rebuilds with those values.

The app is a single scrolling landing page. Section links use simple anchors:

```text
https://<github-username>.github.io/my-portfolio/#projects
```

## Continuous Integration

This repository includes a GitHub Actions CI workflow at `.github/workflows/ci.yml`.

The workflow runs on pushes and pull requests targeting `main` or `master` and performs the following checks:

- Installs dependencies with `npm ci`
- Runs ESLint with `npm run lint`
- Builds the production application with `npm run build`

## License

This project is licensed under the MIT License. See `LICENSE` for details.

Copyright (c) 2026.
