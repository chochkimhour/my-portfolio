import React, { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import Home from "./pages/Home";
import About from "./components/About";
import Services from "./components/Services";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import ScrollToTop from "./components/ScrollToTop";

// Lazy load heavy components
const PortfolioAssistant = lazy(() => import("./components/PortfolioAssistant"));

// Automatically scrolls to top on route change for a clean multi-page feel
function ScrollToTopLogic() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

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

  return (
    // This div ensures the page is at least the full height of the screen
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 selection:bg-amber-500/30">
      <ScrollToTopLogic />
      {/* 1. Header Area */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* 2. Main Page Content */}
      <main className="flex-grow flex flex-col relative w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
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
