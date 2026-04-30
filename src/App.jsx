import React, { useState, useEffect, Suspense, lazy } from "react";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import ScrollToTop from "./components/ScrollToTop";
import { SEO_INFO } from "./constants";

// Lazy load heavy components
const PortfolioAssistant = lazy(() => import("./components/PortfolioAssistant"));

function App() {
  const [darkMode, setDarkMode] = useState(() =>
    window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
  );

  // Update HTML class when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    document.title = SEO_INFO.title;

    const setMeta = (selector, content) => {
      const meta = document.querySelector(selector);
      if (meta) meta.setAttribute("content", content);
    };

    setMeta('meta[name="description"]', SEO_INFO.description);
    setMeta('meta[property="og:title"]', SEO_INFO.ogTitle);
    setMeta('meta[property="og:description"]', SEO_INFO.ogDescription);
  }, []);

  return (
    // This div ensures the page is at least the full height of the screen
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 selection:bg-amber-500/30">
      {/* 1. Header Area */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* 2. Main Page Content */}
      <main className="flex-grow flex flex-col relative w-full">
        <Hero />
        <About />
        <Services />
        <Experience />
        <Projects />
        <Contact />
      </main>

      {/* 3. Footer Area */}
      <Footer />

      {/* 4. Portfolio Assistant Chatbot */}
      <Suspense fallback={null}>
        <PortfolioAssistant />
      </Suspense>

      {/* 5. Scroll To Top Button */}
      <ScrollToTop />
    </div>
  );
}

export default App;
