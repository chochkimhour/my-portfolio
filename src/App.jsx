import { useState, useEffect, useRef } from "react";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import ApiPlayground from "./components/ApiPlayground";
import ScrollToTop from "./components/ScrollToTop";
import { SEO_INFO } from "./constants";

function App() {
  const hasMounted = useRef(false);
  const [darkMode, setDarkMode] = useState(() =>
    window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
  );

  useEffect(() => {
    let animationTimer;

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    if (hasMounted.current) {
      document.documentElement.classList.remove("theme-changing");
      window.requestAnimationFrame(() => {
        document.documentElement.classList.add("theme-changing");
      });
      animationTimer = window.setTimeout(() => {
        document.documentElement.classList.remove("theme-changing");
      }, 520);
    } else {
      hasMounted.current = true;
    }

    return () => {
      if (animationTimer) window.clearTimeout(animationTimer);
    };
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
    <div className="min-h-screen flex flex-col text-neutral-900 dark:text-neutral-100">
      <div className="site-bg" aria-hidden="true">
        <div className="site-bg__rails" />
      </div>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="flex-grow">
        <Hero />
        <ApiPlayground />
        <About />
        <Services />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
