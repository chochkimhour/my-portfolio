import { useState, useEffect } from 'react';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let frameId = null;
        let lastVisible = false;

        const update = () => {
            frameId = null;
            const next = window.scrollY > 500;
            if (next !== lastVisible) {
                lastVisible = next;
                setIsVisible(next);
            }
        };

        const onScroll = () => {
            if (frameId != null) return;
            frameId = window.requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            if (frameId != null) window.cancelAnimationFrame(frameId);
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className={`fixed bottom-6 left-6 z-40 font-mono text-[11px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 transition-[opacity,transform] duration-200 ${
                isVisible ? 'opacity-100 hover:opacity-70' : 'opacity-0 pointer-events-none'
            } hover:scale-110 hover:-translate-y-1`}
        >
            ↑<span className="ml-1">Top</span>
        </button>
    );
};

export default ScrollToTop;
