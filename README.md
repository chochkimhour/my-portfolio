# ✨ Choch Kimhour - Professional Portfolio

<p align="center">
  <img src="https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind--CSS-v4.0-38bdf8?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-6.0-646cff?style=for-the-badge&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Docker-24.0-2496ED?style=for-the-badge&logo=docker" alt="Docker" />
</p>

## 🕶️ Overview
Welcome to the professional portfolio of **Choch Kimhour**, a specialized Software Engineer based in Cambodia. This site is crafted to bridge the gap between elegant minimalist design and technical excellence, providing a high-fidelity experience across all modern devices.

**Live Link:** [Coming Soon](#)

---

## 🎨 Design Philosophy
- **Rich Aesthetics:** Uses a sophisticated **Amber-500** primary brand color paired with charcoal grays for a clean, premium "dark-mode-first" feel.
- **Full HD Optimized:** Specifically designed to scale beautifully from smartphone screens up to **1920px (FHD)** wide monitors.
- **Micro-Interactions:** Custom-built smooth scrolling, glassmorphism navbars, and animated hover effects that make the site feel "alive."

---

## 🚀 Core Features
- **✨ Dynamic Hero:** High-impact introduction with an animated typing effect and staggered card-based image presentation.
- **💼 Professional Services:** High-fidelity cards outlining expertise in Frontend, Backend, and UI/UX Design Strategy.
- **🏆 Experience Timeline:** A premium vertical roadmap showcasing career progression and senior-level impact.
- **🛠️ Project Grid:** Curated showcase of top works with custom-styled tech stack badges and live demo links.
- **🌓 Animated Theme Switch:** A custom-built, pill-style toggle for switching between Light and Dark modes with embedded icons.
- **🌫️ Scroll-Aware Blur:** Advanced glassmorphism navbar that transitions opacity and blur as you explore the page.
- **📈 Real-time Progress:** A subtle, amber-gradient scroll progress bar at the top of the viewport.

---

## 💻 Tech Stack
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (Next-Gen CSS framework)
- **Tooling:** [Vite](https://vitejs.dev/) (High-performance build tool)
- **Containerization:** [Docker](https://www.docker.com/) & Docker Compose
- **Deployment:** Vercel / Netlify / GitHub Pages

---

## 🛠️ Setup & Installation (Docker)

This project is fully containerized for a smooth and consistent development experience using Docker. This ensures hot-reloading works out-of-the-box without needing to manage Node.js versions locally.

Follow these steps to get a local copy up and running:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/chochkimhour/my-portfolio.git
   cd my-portfolio
   ```

2. **Environment Configuration:**
   Copy the `.env.example` file to create your local `.env` configuration:
   ```bash
   # On Windows (Command Prompt)
   copy .env.example .env

   # On Linux / Mac / Git Bash
   cp .env.example .env
   ```
   *Edit the newly created `.env` file to include your specific personal and professional details instead of the placeholders.*

3. **Start the application with Docker:**
   ```bash
   docker compose up -d --build
   ```

4. **Access the Application:**
   Open your browser and navigate to:
   👉 **[http://localhost:5173](http://localhost:5173)**

5. **Stop the Application:**
   When you're done, you can gracefully stop the container by running:
   ```bash
   docker compose down
   ```

*(Note: Any changes you make to the source code on your local machine will automatically be reflected in the browser thanks to Docker volume mapping).*

---

## 📬 Contact
- **Email:** hello@chochkimhour.com
- **LinkedIn:** [chochkimhour](#)
- **GitHub:** [@chochkimhour](https://github.com/chochkimhour)

---

<p align="center">Made with ❤️ by Choch Kimhour</p>
