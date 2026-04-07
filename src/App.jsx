import React, { useState, useEffect, Suspense, lazy } from "react";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";

// Lazy load heavy components
const PortfolioAssistant = lazy(() => import("./components/PortfolioAssistant"));

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode based on system preference
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

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
      {/* 1. Header Area */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* 2. Main Page Content */}
      <Home />

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
