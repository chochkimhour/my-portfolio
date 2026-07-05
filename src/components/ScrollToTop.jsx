import { useState, useEffect } from 'react';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggle = () => setIsVisible(window.pageYOffset > 500);
        window.addEventListener('scroll', toggle);
        return () => window.removeEventListener('scroll', toggle);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className={`fixed bottom-6 right-6 z-40 font-mono text-[11px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 transition-all duration-200 ${
                isVisible ? 'opacity-100 hover:opacity-70' : 'opacity-0 pointer-events-none'
            } hover:scale-110 hover:-translate-y-1`}
        >
            ↑<span className="ml-1">Top</span>
        </button>
    );
};

export default ScrollToTop;
