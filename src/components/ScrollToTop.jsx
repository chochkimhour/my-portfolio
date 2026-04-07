import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[90] transition-all duration-300 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
        }`}>
            <button
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className="w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md text-amber-500 dark:text-amber-400 rounded-full shadow-2xl shadow-amber-500/20 border border-gray-100 dark:border-gray-700 flex items-center justify-center hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 hover:border-amber-500 transition-all hover:-translate-y-1 group active:scale-90"
            >
                <svg 
                    className="w-6 h-6 transition-transform group-hover:-translate-y-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    strokeWidth="3"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"></path>
                </svg>
            </button>
        </div>
    );
};

export default ScrollToTop;
