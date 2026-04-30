# Choch Kimhour Portfolio

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=000000)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwindcss&logoColor=ffffff)
![Node.js](https://img.shields.io/badge/Node.js-20.19+-339933?logo=nodedotjs&logoColor=ffffff)
![Docker](https://img.shields.io/badge/Docker-supported-2496ED?logo=docker&logoColor=ffffff)
![Type](https://img.shields.io/badge/Type-ESM%20JavaScript-F7DF1E?logo=javascript&logoColor=000000)
![License](https://img.shields.io/badge/License-MIT-blue)

A production-ready personal portfolio website for Choch Kimhour, built with React, Vite, Tailwind CSS, and Docker. The application presents professional experience, services, featured projects, contact links, and a small interactive portfolio assistant.

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
- React Router
- Tailwind CSS 4
- Vite
- ESLint
- Docker

## Requirements

Use one of the following setups:

- Node.js 20 or later with npm
- Docker and Docker Compose

## Environment Variables

Create a local environment file before running the application:

```bash
cp .env.example .env
```

On Windows Command Prompt:

```cmd
copy .env.example .env
```

Then update `.env` with your personal information:

```env
USER_NAME="Choch Kimhour"
USER_ROLE="Backend Engineer"
USER_EMAIL="your_email@example.com"
USER_PHONE="+855 ..."
USER_LOCATION="Phnom Penh, Cambodia"
GITLAB_URL="https://gitlab.com/yourusername"
LINKEDIN_URL="https://www.linkedin.com/in/yourusername"
TELEGRAM_URL="https://t.me/yourusername"
TELEGRAM_USERNAME="@yourusername"
TAGLINE="A short professional tagline."
BRAND_DESCRIPTION="A concise professional summary."
ABOUT_P1="First paragraph of your about section."
ABOUT_P2="Second paragraph of your about section."
```

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

1. Push the repository to GitHub.
2. In the GitHub repository, open `Settings` > `Pages`.
3. Set `Build and deployment` > `Source` to `GitHub Actions`.
4. Push to the `main` or `master` branch.

The workflow in `.github/workflows/ci.yml` will install dependencies, run lint, build the site, and deploy the `dist` folder to GitHub Pages.

The app uses hash-based routes so pages work correctly on GitHub Pages:

```text
https://yourusername.github.io/my-portfolio/#/projects
```

## Continuous Integration

This repository includes a GitHub Actions CI workflow at `.github/workflows/ci.yml`.

The workflow runs on pushes and pull requests targeting `main` or `master` and performs the following checks:

- Installs dependencies with `npm ci`
- Runs ESLint with `npm run lint`
- Builds the production application with `npm run build`

## License

This project is licensed under the MIT License. See `LICENSE` for details.

Copyright (c) 2026 Choch Kimhour.
